const { exec } = require('child_process');

process.on('message', ({ tester }) => {
  const testCaseResults = [];

  exec(`docker run -v $(pwd)/test:/test python-runner python ${tester.replace(/^test\//, "")}`, { timeout: 5 * 1000 }, (error, stdout, stderr) => {
    if (error && error.signal === 'SIGTERM') {
      testCaseResults.push({
        testCase: "Error: Time Limit Exceeded",
        passed: false,
        message: "Your code took too long to execute."
      });
    } else if (stderr) {
      const testResults = stderr.trim().split("\n");
      let hasCapturedError = false;

      testResults.forEach((result) => {
        if (result.includes("...")) {
          const [testCase, status] = result.split("...");
          const passed = status.trim() === "ok";
          testCaseResults.push({ testCase: testCase.trim().split(' ')[0], passed });
        } else if (!hasCapturedError && (result.includes("Error") || result.includes("Exception"))) {
          testCaseResults.push({
            testCase: "Error",
            passed: false,
            message: result
          });
          hasCapturedError = true;
        }
      });

      for (const result of testResults) {
        if (result.startsWith('AssertionError')) {
          for (const test of testCaseResults) {
            if (!test.passed && !test.message) {
              test.message = result;
              break;
            }
          }
        }
      }
    } else if (stdout) {
      const testResults = stdout.trim().split("\n");
      testResults.forEach((result) => {
        if (result.includes("...")) {
          const [testCase, status] = result.split("...");
          const passed = status.trim() === "ok";
          testCaseResults.push({ testCase: testCase.trim().split(' ')[0], passed });
        }
      });
    }

    process.send(testCaseResults);
  });
});
