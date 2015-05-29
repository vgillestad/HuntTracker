﻿using HuntTracker.Api.Interfaces.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HuntTracker.Api.Interfaces.DataEntities;
using Biggy.Core;
using Biggy.Data.Json;
using AutoMapper;

namespace HuntTracker.Dal.File.Repositories
{
    public class MarkerRepository : IMarkerRepository
    {
        private BiggyList<Marker> _markers;

        public MarkerRepository(string path)
        {
            var db = new JsonDbCore(path, "HT");
            _markers = new BiggyList<Marker>(new JsonStore<Marker>(db));
        }

        public Task DeleteAsync(string markerId)
        {
            var original = _markers.First(x => x.Id.Equals(markerId, StringComparison.InvariantCultureIgnoreCase));
            _markers.Remove(original);
            return Task.FromResult(0);
        }

        public Task<IEnumerable<Marker>> GetByUser(string userId)
        {
            var markers = _markers.Where(x => x.UserId.Equals(userId, StringComparison.InvariantCultureIgnoreCase));
            return Task.FromResult(markers);
        }

        public Task InsertAsync(Marker marker)
        {
            _markers.Add(marker);
            return Task.FromResult(0);
        }

        public Task UpdateAsync(Marker marker)
        {
            var original = _markers.First(x => x.Id.Equals(marker.Id, StringComparison.InvariantCultureIgnoreCase));
            Mapper.DynamicMap(marker, original);
            return Task.FromResult(0);
        }
    }
}