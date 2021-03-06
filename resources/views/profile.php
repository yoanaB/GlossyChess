<div class="container profile col-sm-12" >
    <div class="row">
        <div class="pull-left col-md-4" id="profile-image">
            <img ng-src="{{user.imageURL}}"/>
            <span id="edit"><a href="" ng-click="isCollapsed = !isCollapsed">Edit</a> </span>
            <div uib-collapse="isCollapsed">
                <input type="file" name="image" ng-model="image"/>
                <button class="btn btn-default" ng-click="saveImage(image)">Submit</button>
            </div>
        </div>
        <div class="pull-right col-md-7" id="user-information">
            <h2>Welcome, {{user.name}}!</h2>
            <p class="scores">Score: {{user.score}}</p>
            <p class="played-games">Number of played games: {{user.numberOfPlayedGames}}</p>
            <p class="rating">Rating:
                <uib-rating ng-model="rate" max="10" read-only="true" titles="['one','two','three']" aria-labelledby="default-rating"></uib-rating>
                <span class="label-info" ng-show="true">{{user.rating}} points/played games</span>
            </p>
        </div>
    </div>
    <div id="active-users" class="clearfix col-md-12">
        <h3 id="acive-users-list">Active Users List:</h3>
        <label class="col-sm-2 label-control">Search:</label>
        <div class="col-sm-4">
            <input type="text" class="form-control col-lg-4" id="searchActiveUsers" ng-model="query"/>
        </div>
        <label class="col-sm-2 label-control">Sort by:</label>
        <select class="col-sm-4" ng-model="orderProp">
            <option value="username">Alphabetical</option>
            <option value="age">Rating</option>
        </select>
        <table class="table">
            <tr>
                <th>№</th>
                <th>Username</th>
                <th>Score</th>
                <th>Rating</th>
                <th>Challenge</th>
            </tr>
            <tr ng-repeat="x in activeUsers | filter:query | orderBy:orderProp">
                <td>{{$index + 1}}</td>
                <td>{{x.username}}</td>
                <td>{{x.score}}</td>
                <td>{{x.rating}}</td>
                <td>
                    <button class="btn btn-default" ng-click="challenge()">Challenge</button>
                </td>
            </tr>
        </table>
        <uib-pagination total-items="activeUsersLength" ng-model="bigCurrentPage" max-size="maxSize" id="active-users-pagination"
                        class="pagination-sm" boundary-links="true" force-ellipses="true"></uib-pagination>
    </div>
</div>