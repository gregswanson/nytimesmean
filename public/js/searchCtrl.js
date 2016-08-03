controllers.searchCtrl = function($scope, $http){
	$scope.results = []; 

	
	$scope.searchNow = function(){
		$http.get('http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ $scope.searchTerm +'&begin_date='+ $scope.beginTerm +'0101&end_date='+ $scope.endTerm +'0101&api-key=9d4a8986921972b65754ea0809d47c84%3A12%3A74623931')
    		.then(function(response) {
        $scope.results = response.data.response.docs;
        console.log(response.data.response.docs);
    	});
	};

	$scope.saveIt = function(index){
		var savedResult = {
			title: $scope.results[index].headline.main,
			body: $scope.results[index].abstract,
			link: $scope.results[index].web_url
		};
		
		console.log(savedResult);
	}
};