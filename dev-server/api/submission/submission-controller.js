import Submission from '../../model/submission_model'

export function userSubmit(req, res) {
    Submission.find({ user_id: req.body.user_id, month: req.body.submission }, (error, found_submission) => {
        if (error) {
            return res.status(500).json()
        }

        if (found_submission[0] === undefined) {
            const submission = new Submission({
                month: req.body.submission,
                workflow_status: "Submitted",
                user_id: req.body.user_id,
                month_total: req.body.month_total,
                user_name: req.body.full_name
            })

            submission.save(error => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({ message: error })
                }

                return res.status(201).json()
            })
        } else {
            res.status(409).json({message: `There is already a submission for ${req.body.submission }`})
        }

        return res.status(200).json()
    })
}

export function userSubmissions(req, res) {
    Submission.find({ user_id: req.params.id }, (error, found_submissions) => {
        if (error) {
            return res.status(500).json()
        }

        return res.status(200).json({submissions: found_submissions})
    })
}

export function submissionsToProcess(req, res) {
    Submission.find({workflow_status: "Submitted"}, (error, found_submissions) => {
        if (error) {
            return res.status(500).json()
        }

        return res.status(200).json({submissions: found_submissions})
    })
}

export function process(req, res) {
    req.body.submission
    Submission.updateOne({_id: req.params.id}, req.body.submission, (error, updated_submission) => {
        if (error) {
            return res.status(500).json()
        }

        return res.status(200).json()
    })
}