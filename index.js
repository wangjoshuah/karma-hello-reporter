var HelloReporter = function (baseReporterDecorator, config, logger, helper, formatError) {
  baseReporterDecorator(this);

  var log = logger.create('reporter.hello');

  var helloConfig = config.HelloReporter || {};

  var successMsg = helloConfig.successMsg;
  var failureMsg = helloConfig.failureMsg;

  this.adapters = [function(msg) {
    process.stdout.write.bind(process.stdout)("[hello-reporter] " + msg + "\n");
  }];

  this.onBrowserStart = function(browser, info) {
    this.write("[onBrowserStart] Hello " + browser.name);
  }
  this.specSuccess = function(browser, result) {
    this.write(helloConfig.successMsg);
    this.write("specSuccess");
  }
  this.specFailure = function(browser, result) {
    this.write(helloConfig.failureMsg);
    this.write("specFailure");
  };

  this.onSpecComplete = function(browser, result) {
    this.write("onSpecComplete");
    this.write("result: " + result);
    this.write("result: %j", result);
    this.write(result);
    if (result.skipped) {
      this.write("spec skipped");
      this.specSkipped(browser, result);
    } else if (result.success) {
      this.write("success");
      this.specSuccess(browser, result);
    } else {
      this.write("failure");
      this.specFailure(browser, result);
    }
    this.write(result.description);
  }
  this.onRunComplete = function(browsersCollection, results) {
    this.write("GoodBye World");
  };
}

HelloReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper', 'formatError'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:hello': ['type', HelloReporter]
};
