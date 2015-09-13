<!--MARKER MODAL-->
    <script type="text/ng-template" id="widget.modal.html">
        <div class="modal-body">
            <form ng-submit="addMarkerSubmit()">
                <div class="form-group" ng-show="youAreHere">
                    <i class="icon-location5" style="color:green"></i>
                    <span translate>This is where <strong>you</strong> are now.</span>
                    <hr />
                </div>
                <small ng-if="!marker.id" class="text-justify" translate>Add a pin. Enter a description and tag (#) the pin:</small>
                <div class="form-group">
                    <textarea class="form-control" ng-model="marker.description" ng-change="extractDescriptionTags()"></textarea>
                </div>
                <div class="form-group">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" ng-class="{active: shotIcons[marker.icon] != null }">
                            <a href="#shot" aria-controls="shot" role="tab" data-toggle="tab"><i class="icon-target3"> </i><span translate>Shot</span></a>
                        </li>
                        <li role="presentation" ng-class="{active: seenIcons[marker.icon] != null }">
                            <a href="#seen" aria-controls="seen" role="tab" data-toggle="tab"><i class="icon-binoculars"> </i><span translate>Seen</span></a>
                        </li>
                        <li role="presentation" ng-class="{active: otherIcons[marker.icon] != null }">
                            <a href="#other" aria-controls="other" role="tab" data-toggle="tab"><i class="icon-compass5"> </i><span translate>Other</span></a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane" ng-class="{active: shotIcons[marker.icon] != null }" id="shot">
                            <button ng-repeat="(key, value) in shotIcons" class="btn btn-default animal-btn" ng-class="key === marker.icon ? 'btn-selected' : ''"
                                    ng-click="setIcon(key)">
                                <div ng-show="value.type === 'image'" ng-style="{'background-image': 'url(' + value.src + ')', 'height': value.size[1] + 'px', 'width': value.size[0] + 'px', 'background-position': '-' + value.offset[0] + 'px -' + value.offset[1] + 'px', 'zoom': value.scale, '-moz-transform': 'scale(' + value.scale + ')'}"></div>
                                <i ng-show="value.type === 'font'" ng-class="value.class" style="font-size:25px"></i>
                            </button>
                        </div>
                        <div role="tabpanel" class="tab-pane" ng-class="{active: seenIcons[marker.icon] != null }" id="seen">
                            <button ng-repeat="(key, value) in seenIcons" class="btn btn-default animal-btn" ng-class="key === marker.icon ? 'btn-selected' : ''"
                                    ng-click="setIcon(key)">
                                <div ng-show="value.type === 'image'" ng-style="{'background-image': 'url(' + value.src + ')', 'height': value.size[1] + 'px', 'width': value.size[0] + 'px', 'background-position': '-' + value.offset[0] + 'px -' + value.offset[1] + 'px', 'zoom': value.scale, '-moz-transform': 'scale(' + value.scale + ')'}"></div>
                                <i ng-show="value.type === 'font'" ng-class="value.class" style="font-size:25px"></i>
                            </button>
                        </div>

                        <div role="tabpanel" class="tab-pane" ng-class="{active: otherIcons[marker.icon] != null }" id="other">
                            <button ng-repeat="(key, value) in otherIcons" class="btn btn-default animal-btn" ng-class="key === marker.icon ? 'btn-selected' : ''"
                                    ng-click="setIcon(key)">
                                <div ng-show="value.type === 'image'" ng-style="{'background-image': 'url(' + value.src + ')', 'height': value.size[1] + 'px', 'width': value.size[0] + 'px', 'background-position': '-' + value.offset[0] + 'px -' + value.offset[1] + 'px', 'zoom': value.scale, '-moz-transform': 'scale(' + value.scale + ')'}"></div>
                                <i ng-show="value.type === 'font'" ng-class="value.class" style="font-size:25px"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    Tags 
                    <i class="icon-question" 
                       tooltip="{{'Tags are categories that can be used when searching an filtering points. Most icons have assosiated tags. You can add your own tags by using hashtag in the description text box, i.e. #team1 joined me, will add a team1 tag.' | translate}}" 
                       tooltip-placement="right"
                       tooltip-trigger="click"></i>: 
                    <span class="badge" ng-repeat="tag in icons[marker.icon].tags" style="margin-right:2px">
                        #{{tag | translate}}
                    </span>
                    <span class="badge badge-lighter" ng-repeat="tag in descriptionTags" style="margin-right:2px">
                        #{{tag | translate}}
                    </span>
                </div>

                <datetime-picker model="marker.dateTime"></datetime-picker>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-danger pull-left" ng-if="showDelBtn" ng-click="delete()" translate>Delete</button>
            <button type="button" class="btn btn-sm btn-danger pull-left" ng-if="showDelConfirmBtn" ng-click="deleteConfirm()"
                    translate>
                Are you sure?
            </button>
            <button type="button" class="btn btn-sm btn-default" ng-click="cancel()" translate>Cancel</button>
            <button type="submit" class="btn btn-success" ng-click="submit()">{{submitText | translate}}</button>
        </div>
    </script>