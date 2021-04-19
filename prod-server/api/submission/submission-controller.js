"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSubmit = userSubmit;
exports.userSubmissions = userSubmissions;
exports.submissionsToProcess = submissionsToProcess;
exports.process = process;

var _submission_model = _interopRequireDefault(require("../../model/submission_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function userSubmit(req, res) {
  _submission_model.default.find({
    user_id: req.body.user_id,
    month: req.body.submission
  }, (error, found_submission) => {
    if (error) {
      return res.status(500).json();
    }

    if (found_submission[0] === undefined) {
      const submission = new _submission_model.default({
        month: req.body.submission,
        workflow_status: "Submitted",
        user_id: req.body.user_id,
        month_total: req.body.month_total,
        user_name: req.body.full_name
      });
      submission.save(error => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: error
          });
        }

        return res.status(201).json();
      });
    } else {
      res.status(409).json({
        message: `There is already a submission for ${req.body.submission}`
      });
    }

    return res.status(200).json();
  });
}

function userSubmissions(req, res) {
  _submission_model.default.find({
    user_id: req.params.id
  }, (error, found_submissions) => {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json({
      submissions: found_submissions
    });
  });
}

function submissionsToProcess(req, res) {
  _submission_model.default.find({
    workflow_status: "Submitted"
  }, (error, found_submissions) => {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json({
      submissions: found_submissions
    });
  });
}

function process(req, res) {
  req.body.submission;

  _submission_model.default.updateOne({
    _id: req.params.id
  }, req.body.submission, (error, updated_submission) => {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json();
  });
}