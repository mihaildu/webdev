angular.module('my-service3', [])
.factory('logger', function() {
  const logSomething = () => {
      console.log('hi');
  };
  return {
    logSomething
  };
});

