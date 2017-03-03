controllers.searchCtrl = function($scope, $http){
	$scope.results = []; 
	$scope.keepers = []; 
	$scope.placeholder = '<p>Enter a Term, Start Year, and End Year to begin.</p>';

	
	$scope.searchNow = function(){

		$http.get('http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ $scope.searchTerm +'&begin_date='+ $scope.beginTerm +'0101&end_date='+ $scope.endTerm +'0101&api-key=fc528b0599894edcbc113a5b6026ba37')
    		.then(function(response) {
        $scope.results = response.data.response.docs;
        console.log(response.data.response.docs);
    	});
    	$scope.placeholder = "";
    	$scope.searchTerm = "";
		$scope.beginTerm = "";
		$scope.endTerm = "";
	};

	$scope.saveIt = function(index){
		    //var title = $scope.results[index].headline.main;
			//var body = $scope.results[index].abstract;
			//var link = $scope.results[index].web_url;

		var savedResult = {
			title: $scope.results[index].headline.main,
			body: $scope.results[index].abstract,
			link: $scope.results[index].web_url
		};

		console.log(savedResult);
		
		 // Saves the article data to the db
        $http.post('/saveArticle', savedResult)
            .success(function (data) {
            	console.log("success");
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

//// New controller
	

	
	$scope.getArticles = function(){

		$http.get('/getArticles')
    		.then(function(response) {
        $scope.keepers = response.data;
        console.log(response);
    	});

   
	};

	$scope.deleteIt = function(id){
		var id = id;
		var deleteID =  {id: id}; 
		$http.post('/delete', deleteID)
            .success(function (data) {
            	console.log("success");
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
            $scope.getArticles();
	}

	$scope.getArticles();


};
