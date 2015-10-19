﻿using HuntTracker.Api.Interfaces.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HuntTracker.Api.Interfaces.DataEntities;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Linq;
using HuntTracker.Dal.Common;

namespace DataDocumentDB.Repositories
{
    public class TeamRepository : ITeamRepository
    {
        private DocumentClient _client;
        private DocumentCollection _collection;
        private IUserRepository _userRepository;

        public TeamRepository(DocumentClient client, DocumentCollection collection, IUserRepository userRepository)
        {
            _client = client;
            _collection = collection;
            _userRepository = userRepository;
        }

        public Task ActivateMember(string teamId, string userId)
        {
            var team = _client.CreateDocumentQuery<TeamStored>(_collection.SelfLink)
                .Where(x => x.Id == teamId)
                .AsEnumerable()
                .FirstOrDefault();
            team.Members.First(x => x.UserId == userId).Status = TeamMemberStatus.Active;

            return UpdateAsync(team);
        }

        public Task AddUserAsMember(string teamId, string userId, TeamMemberStatus status)
        {
            var team = _client.CreateDocumentQuery<TeamStored>(_collection.SelfLink)
                .Where(x => x.Id == teamId)
                .AsEnumerable()
                .FirstOrDefault();
            var members = team.Members.ToList();
            members.Add(new MemberStored() { UserId = userId, Status = status });
            team.Members = members;
            return UpdateAsync(team);
        }

        public async Task DeleteAsync(string teamId)
        {
            var currentDocument = _client.CreateDocumentQuery(_collection.SelfLink)
                .Where(x => x.Id == teamId)
                .AsEnumerable()
                .FirstOrDefault();

            await _client.DeleteDocumentAsync(currentDocument.SelfLink);
        }

        public Task<Team> GetByIdAsync(string id)
        {
            var query = _client.CreateDocumentQuery<Team>(_collection.SelfLink)
                .Where(x => x.Id == id)
                .AsEnumerable()
                .FirstOrDefault();

            return Task.FromResult(query);
        }

        public async Task<IEnumerable<Team>> GetByUserAsync(string userId, bool activeOnly)
        {
            var query = _client.CreateDocumentQuery<TeamStored>(
                _collection.SelfLink,
                new SqlQuerySpec()
                {
                    QueryText = @"
                        SELECT VALUE team 
                        FROM team 
                        JOIN member in team.Members 
                        WHERE 
                          member.UserId = @userId
                          AND (@activeOnly = false OR member.Status IN (0,1))",
                    Parameters = new SqlParameterCollection()
                    {
                        new SqlParameter("@userId", userId),
                        new SqlParameter("@activeOnly", activeOnly),
                    }
                }).AsEnumerable();

            return query;
        }


        //Needs to be re-written.
        public async Task<IEnumerable<Member>> GetMemebersByTeam(string teamId)
        {
            var team = _client.CreateDocumentQuery<TeamStored>(_collection.SelfLink)
                .Where(x => x.Id == teamId)
                .AsEnumerable()
                .FirstOrDefault();

            var users = await _userRepository.GetByIds(team.Members.Select(x => x.UserId));
            var count = users.Count();
            return users.Select(x =>
            {
                var member = new Member()
                {
                    UserId = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Status = team.Members.First(y => y.UserId == x.Id).Status
                };
                return member;
            });
        }

        public async Task InsertAsync(Team team)
        {
            await _client.CreateDocumentAsync(_collection.SelfLink, team);
        }

        public Task InviteUserToTeam(string teamId, string userId)
        {
            return AddUserAsMember(teamId, userId, TeamMemberStatus.Invited);
        }

        public Task PauseMembership(string teamId, string userId)
        {
            var team = _client.CreateDocumentQuery<TeamStored>(_collection.SelfLink)
                .Where(x => x.Id == teamId)
                .AsEnumerable()
                .FirstOrDefault();
            team.Members.First(x => x.UserId == userId).Status = TeamMemberStatus.Paused;

            return UpdateAsync(team);
        }

        public Task RemoveMember(string teamId, string userId)
        {
            var team = _client.CreateDocumentQuery<TeamStored>(_collection.SelfLink)
                .Where(x => x.Id == teamId)
                .AsEnumerable()
                .FirstOrDefault();
            var members = team.Members.ToList();
            members.Remove(team.Members.First(x => x.UserId.Equals(userId)));
            team.Members = members;
            return UpdateAsync(team);
        }

        public Task RequestMembership(string teamId, string userId)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(Team team)
        {
            var currentDocument = _client.CreateDocumentQuery(_collection.SelfLink)
                .Where(x => x.Id == team.Id)
                .AsEnumerable()
                .FirstOrDefault();

            await _client.ReplaceDocumentAsync(currentDocument.SelfLink, team);
        }
    }
}
