var notes_app = angular.module('notes_app', ['LocalStorageModule']);

// Setting a prefix to avoid overwriting any localStorage variables from the rest of the apps
// Can change web storage type to localStorage or sessionStorage
notes_app.config(function (localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('notesApp')
		.setStorageType('localStorage')
});

// Controller
notes_app.controller('NoteController', function($scope, localStorageService) {
	// first check if the browser support the current storage type
	if(localStorageService.isSupported) {	
		$scope.notes = [];
		// directly get data from local Storage.
		getNotes = function() {
			// var notes = [];
			var value;
			for(var i=0; i<localStorageService.length(); i++) {
				if(!localStorageService.get(i)) {
					break;
				}
				else {
					note = localStorageService.get(i);
					$scope.notes.push(note);
				}
			}
		}
		getNotes();

		// storing updated data into localStorage
		$scope.store = function() {
			localStorageService.clearAll();
			for(var i = 0; i < $scope.notes.length; i++) {
				localStorageService.set(i, $scope.notes[i]);
			}
		}
		// create note by adding to $scope.notes then localStorage
		$scope.createNote = function() {
			$scope.notes.push($scope.new_note);
			$scope.new_note = "";	//to clear up the input field
			$scope.store();
		}

		// edit and update note
		$scope.editNote = function(idx, new_note) {
			$scope.notes[idx] = new_note;
			$scope.store();
		}

		//delete note from $scope.notes and update the localStorage
		$scope.removeNote = function(idx) {
			$scope.notes.splice(idx, 1);
			$scope.store();
		}
	}
	// if local storage is not supported on the current window, alert it
	else {
		alert("LocalStorage is not supported. Please avoid using private window!")
	}
})