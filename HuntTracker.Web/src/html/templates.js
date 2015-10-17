angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("help.tpl.html","<div class=\"modal-header\">\r\n	<h1 translate>4 tips for you</h1>\r\n</div>\r\n<div class=\"modal-body\">\r\n	<ul style=\"padding-left:10px\">\r\n		<li translate>Press <i class=\"icon-circles\"></i> to find your location.</li>\r\n		<li translate>Tap-and-hold to add point in the map</li>\r\n		<li translate>Use <i class=\"icon-filter\"></i> to filter points.</li>\r\n		<li translate>Use <i class=\"icon-stack2\"></i> to change what map to use.</li>\r\n	</ul>\r\n</div>\r\n<div class=\"modal-footer\">\r\n	<button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"cancel()\" translate>Ok</button>\r\n</div>");
$templateCache.put("marker.mine.tpl.html","<div class=\"modal-body\">\r\n	<form ng-submit=\"addMarkerSubmit()\">\r\n		<div class=\"form-group\" ng-show=\"position.youAreHere\">\r\n			<i class=\"icon-circles text-primary\"></i>\r\n			<span translate>This is where <strong>you</strong> are now.</span>\r\n			<small ng-if=\"position.accuracy\">\r\n				(<span translate>Accuracy:</span> {{position.accuracy}}m)\r\n			</small>\r\n			<hr />\r\n		</div>\r\n		<small ng-if=\"!marker.id\" class=\"text-justify\" translate>Add a pin. Enter a description and tag (#) the pin:</small>\r\n		<div class=\"form-group\">\r\n			<textarea class=\"form-control\" ng-model=\"marker.description\" ng-change=\"extractDescriptionTags()\"></textarea>\r\n		</div>\r\n		<div class=\"form-group\">\r\n			<ul class=\"nav nav-tabs\" role=\"tablist\">\r\n				<li role=\"presentation\" ng-class=\"{active: shotIcons[marker.icon] != null }\">\r\n					<a href=\"#shot\" aria-controls=\"shot\" role=\"tab\" data-toggle=\"tab\"><i class=\"icon-target3\"> </i><span translate>Shot</span></a>\r\n				</li>\r\n				<li role=\"presentation\" ng-class=\"{active: seenIcons[marker.icon] != null }\">\r\n					<a href=\"#seen\" aria-controls=\"seen\" role=\"tab\" data-toggle=\"tab\"><i class=\"icon-binoculars\"> </i><span translate>Seen</span></a>\r\n				</li>\r\n				<li role=\"presentation\" ng-class=\"{active: otherIcons[marker.icon] != null }\">\r\n					<a href=\"#other\" aria-controls=\"other\" role=\"tab\" data-toggle=\"tab\"><i class=\"icon-compass5\"> </i><span translate>Other</span></a>\r\n				</li>\r\n			</ul>\r\n\r\n			<div class=\"tab-content\">\r\n				<div role=\"tabpanel\" class=\"tab-pane\" ng-class=\"{active: shotIcons[marker.icon] != null }\" id=\"shot\">\r\n					<button ng-repeat=\"(key, value) in shotIcons\" class=\"btn btn-default animal-btn\" ng-class=\"key === marker.icon ? \'btn-selected\' : \'\'\"\r\n					ng-click=\"setIcon(key)\">\r\n						<div ng-show=\"value.type === \'image\'\" ng-style=\"{\'background-image\': \'url(\' + value.src + \')\', \'height\': value.size[1] + \'px\', \'width\': value.size[0] + \'px\', \'background-position\': \'-\' + value.offset[0] + \'px -\' + value.offset[1] + \'px\', \'zoom\': value.scale, \'-moz-transform\': \'scale(\' + value.scale + \')\'}\"></div>\r\n						<i ng-show=\"value.type === \'font\'\" ng-class=\"value.class\" style=\"font-size:25px\"></i>\r\n					</button>\r\n				</div>\r\n				<div role=\"tabpanel\" class=\"tab-pane\" ng-class=\"{active: seenIcons[marker.icon] != null }\" id=\"seen\">\r\n					<button ng-repeat=\"(key, value) in seenIcons\" class=\"btn btn-default animal-btn\" ng-class=\"key === marker.icon ? \'btn-selected\' : \'\'\"\r\n					ng-click=\"setIcon(key)\">\r\n						<div ng-show=\"value.type === \'image\'\" ng-style=\"{\'background-image\': \'url(\' + value.src + \')\', \'height\': value.size[1] + \'px\', \'width\': value.size[0] + \'px\', \'background-position\': \'-\' + value.offset[0] + \'px -\' + value.offset[1] + \'px\', \'zoom\': value.scale, \'-moz-transform\': \'scale(\' + value.scale + \')\'}\"></div>\r\n						<i ng-show=\"value.type === \'font\'\" ng-class=\"value.class\" style=\"font-size:25px\"></i>\r\n					</button>\r\n				</div>\r\n\r\n				<div role=\"tabpanel\" class=\"tab-pane\" ng-class=\"{active: otherIcons[marker.icon] != null }\" id=\"other\">\r\n					<button ng-repeat=\"(key, value) in otherIcons\" class=\"btn btn-default animal-btn\" ng-class=\"key === marker.icon ? \'btn-selected\' : \'\'\"\r\n					ng-click=\"setIcon(key)\">\r\n						<div ng-show=\"value.type === \'image\'\" ng-style=\"{\'background-image\': \'url(\' + value.src + \')\', \'height\': value.size[1] + \'px\', \'width\': value.size[0] + \'px\', \'background-position\': \'-\' + value.offset[0] + \'px -\' + value.offset[1] + \'px\', \'zoom\': value.scale, \'-moz-transform\': \'scale(\' + value.scale + \')\'}\"></div>\r\n						<i ng-show=\"value.type === \'font\'\" ng-class=\"value.class\" style=\"font-size:25px\"></i>\r\n					</button>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<div class=\"form-group\">\r\n			Tags\r\n			<i class=\"icon-question\" tooltip=\"{{\'Tags are categories that can be used when searching an filtering points. Most icons have assosiated tags. You can add your own tags by using hashtag in the description text box, i.e. #team1 joined me, will add a team1 tag.\' | translate}}\"\r\n			tooltip-placement=\"right\" tooltip-trigger=\"click\"></i>:\r\n			<span class=\"badge\" ng-repeat=\"tag in icons[marker.icon].tags\" style=\"margin-right:2px\">\r\n                        #{{tag | translate}}\r\n                    </span>\r\n			<span class=\"badge badge-lighter\" ng-repeat=\"tag in descriptionTags\" style=\"margin-right:2px\">\r\n                        #{{tag | translate}}\r\n                    </span>\r\n		</div>\r\n\r\n		<datetime-picker model=\"marker.dateTime\"></datetime-picker>\r\n\r\n		<span ng-if=\"teams.length > 0\">\r\n          <hr/>\r\n          <i class=\"icon-share3\"> </i>\r\n		  <span translate>Share with:</span>\r\n		<ul class=\"list-unstyled\">\r\n			<li ng-repeat=\"team in teams\" ng-click=\"shareWithTeam(team.id)\" class=\"row\">\r\n				<span class=\"col-xs-10\">{{team.name}}</span>\r\n				<span class=\"col-xs-2\">\r\n					<i style=\"font-size:25px\" ng-class=\"marker.sharedWithTeamIds.indexOf(team.id) > -1 ? \'icon-toggle-on text-success\' : \'icon-toggle-off text-muted\'\"></i>\r\n				</span>\r\n			</li>\r\n		</ul>\r\n		</span>\r\n	</form>\r\n</div>\r\n<div class=\"modal-footer\">\r\n	<button type=\"button\" class=\"btn btn-sm btn-danger pull-left\" ng-if=\"showDelBtn\" ng-click=\"delete()\" translate>Delete</button>\r\n	<button type=\"button\" class=\"btn btn-sm btn-danger pull-left\" ng-if=\"showDelConfirmBtn\" ng-click=\"deleteConfirm()\" translate>\r\n		Are you sure?\r\n	</button>\r\n	<button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"cancel()\" translate>Cancel</button>\r\n	<button type=\"submit\" class=\"btn btn-success\" ng-click=\"submit()\">{{submitText | translate}}</button>\r\n</div>");
$templateCache.put("marker.other.tpl.html","<div class=\"modal-body\">\r\n	<div \r\n	  ng-if=\"icon.type === \'image\'\" \r\n	  ng-style=\"{\'background-image\': \'url(\' + icon.src + \')\', \'height\': icon.size[1] + \'px\', \'width\': icon.size[0] + \'px\', \'background-position\': \'-\' + icon.offset[0] + \'px -\' + icon.offset[1] + \'px\', \'zoom\': icon.scale, \'-moz-transform\': \'scale(\' + icon.scale + \')\'}\">\r\n	</div>\r\n	<i ng-if=\"icon.type === \'font\'\" ng-class=\"icon.class\" style=\"font-size:25px\"></i>\r\n	<p><i class=\"icon-user\"> </i><strong>{{addedBy.firstName}} {{addedBy.lastName}}</strong></p>\r\n	<p><i class=\"icon-calendar\"> </i> {{formattedDateTime}}</p>\r\n	<p ng-if=\"marker.description\">\r\n		<i class=\"icon-file-text\"> </i>\r\n		<span translate>Description: </span> {{marker.description}}\r\n	</p>\r\n\r\n	<div>\r\n		<i class=\"icon-price-tag3\"> </i> Tags\r\n		<i class=\"icon-question\" tooltip=\"{{\'Tags are categories that can be used when searching an filtering points. Most icons have assosiated tags. You can add your own tags by using hashtag in the description text box, i.e. #team1 joined me, will add a team1 tag.\' | translate}}\"\r\n		tooltip-placement=\"right\" tooltip-trigger=\"click\"></i>:\r\n		<span class=\"badge\" ng-repeat=\"tag in icon.tags\" style=\"margin-right:2px\">\r\n                  #{{tag | translate}}\r\n              </span>\r\n		<span class=\"badge badge-lighter\" ng-repeat=\"tag in descriptionTags\" style=\"margin-right:2px\">\r\n                  #{{tag | translate}}\r\n              </span>\r\n	</div>\r\n	<br/>\r\n	<p>\r\n		<i class=\"icon-share3\"> </i>\r\n		<span translate>Shared with: </span>\r\n		<span ng-repeat=\"team in sharedWithTeams\">{{team.name}}</span>\r\n	</p>\r\n</div>\r\n<div class=\"modal-footer\">\r\n	<button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"cancel()\" translate>Close</button>\r\n</div>");
$templateCache.put("team.tpl.html","<div class=\"modal-header\">\r\n	<h1 translate>Hunting Team</h1>\r\n</div>\r\n<div class=\"modal-body\">\r\n	<p translate>By creating a hunting team, you will be able to share points you add in the map with the other team members.</p>\r\n	<p translate>When you create a hunting team you can invite others to join. The invites have to be accepted before they become active memebers of the hunting team.</p>\r\n	<i ng-if=\"loading\" class=\"icon-spinner3 spinner\" style=\"font-size:25px\"></i>\r\n	<accordion close-others=\"true\">\r\n		<accordion-group ng-repeat=\"t in teams\" is-open=\"t.isOpen\">\r\n			<accordion-heading>\r\n				{{t.name}}\r\n				<i class=\"icon-cancel-circle2 text-danger pull-right\" ng-click=\"removeTeam(t.id)\" ng-show=\"t.userIsTeamAdmin && t.members.length < 2\"></i>\r\n			</accordion-heading>\r\n			<i ng-if=\"t.userIsTeamAdmin\" class=\"text-muted\" translate>\r\n                        You are admin for this team and can invite and remove members.\r\n                    </i>\r\n			<span ng-if=\"t.userMemberStatus === \'invited\'\">\r\n                        <span translate>You have been invited to this hunting team. Do you accept or decline membership?</span>\r\n			<button type=\"button\" ng-click=\"acceptInvitation(t.id)\" class=\"btn btn-default btn-sm\" translate>Accept</button>\r\n			<button type=\"button\" ng-click=\"declineInvitation(t.id)\" class=\"btn btn-default btn-sm\" translate>Decline</button>\r\n			</span>\r\n			<i ng-if=\"t.userMemberStatus === \'paused\'\" class=\"text-muted\" translate>\r\n                        Your membership with this team has been paused by the the team admin.\r\n                    </i>\r\n			<br/>\r\n			<ul class=\"list-unstyled\">\r\n				<li ng-repeat=\"member in t.members\">\r\n					{{member.firstName}} {{member.lastName}}\r\n					<span class=\"label\" ng-class=\"{\'label-success\': member.status === \'active\', \'label-info\': member.status === \'invited\', \'label-warning\': member.status === \'paused\', \'label-primary\': member.status === \'admin\'}\">\r\n                                {{member.status | translate}}\r\n                            </span>\r\n					<span ng-if=\"t.userIsTeamAdmin\" class=\"member-actions\">\r\n                              <span class=\"btn btn-danger btn-sm btn-circle-sm\" ng-click=\"removeMember(t.id, member.userId)\" ng-if=\"t.adminId !== member.userId\">\r\n                                <i class=\"icon-cross2\"></i>\r\n                              </span>\r\n					<span class=\"btn btn-default btn-sm btn-circle-sm\" ng-click=\"pauseMember(t.id, member.userId)\" ng-if=\"member.status === \'active\'\">\r\n                                <i class=\"icon-pause2\"></i>\r\n                              </span>\r\n					<span class=\"btn btn-default btn-sm btn-circle-sm\" ng-click=\"activateMember(t.id, member.userId)\" ng-if=\"member.status === \'paused\'\">\r\n                                <i class=\"icon-play4\"></i>\r\n                              </span>\r\n					</span>\r\n				</li>\r\n			</ul>\r\n\r\n			<span ng-if=\"t.userIsTeamAdmin\">\r\n                        Invite member:\r\n                        <div class=\"input-group\" ng-if=\"t.userIsTeamAdmin\">\r\n                            <input type=\"email\" class=\"form-control\" ng-model=\"inviteEmail\" placeholder=\"{{\'email\' | translate}}\" />\r\n                            <span class=\"input-group-btn\">\r\n                                <button type=\"button\" ng-click=\"inviteMember(t.id, inviteEmail)\" class=\"btn btn-default\" translate>Invite</button>\r\n                            </span>\r\n</div>\r\n<p class=\"text-danger\">{{errorMessage | translate}}</p>\r\n</span>\r\n</accordion-group>\r\n</accordion>\r\n\r\n<span translate>Create team:</span>\r\n<div class=\"input-group\">\r\n	<input type=\"text\" class=\"form-control\" ng-model=\"newTeam.name\" placeholder=\"{{\'Name of the new team ...\' | translate}}\"\r\n	/>\r\n	<span class=\"input-group-btn\">\r\n                    <button type=\"button\" ng-click=\"createTeam()\" class=\"btn btn-default\" translate>Create</button>\r\n                </span>\r\n</div>\r\n\r\n</div>\r\n<div class=\"modal-footer\">\r\n	<button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"cancel()\" translate>Done</button>\r\n</div>");}]);