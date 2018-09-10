import { Request, Response } from "express";
import { company } from "../models/company";
import { lesson } from "../models/lesson";
import { user } from "../models/user";
import { lessonUserMapping } from "../models/lessonUserMapping";

export class Controllers {

    async AssignLessonToUser(req: Request, res: Response) {
        let userRes = await user.find({ name: req.body.user }, { _id: 1, name: 1 });
        let lessonRes = await lesson.find({ name: req.body.lesson }, { _id: 1, name: 1, company: 1 });

        let companyRes = await company.find({ _id: lessonRes[0].company }, { _id: 1, name: 1 });

        if (userRes.length > 0 && lessonRes.length > 0) {
            let lessonUserMappingModel = new lessonUserMapping({
                userId: userRes[0]._id,
                user: userRes[0].name,
                lessonId: lessonRes[0]._id,
                lesson: lessonRes[0].name,
                companyId: companyRes[0]._id,
                company: companyRes[0].name
            });

            lessonUserMappingModel
                .save()
                .then(c => res.json(c))
                .catch(err => res.send('An error occured while assigning lesson to user'));

        } else {
            res.send('An error occured while assigning lesson to user');
        }
    }

    LessonPOST(req: Request, res: Response) {
        company.find({ name: req.body.company }, { _id: 1 })
            .then(companyId => {

                let lessonModel = new lesson({
                    name: req.body.name,
                    company: companyId[0]._id
                });

                lessonModel
                    .save()
                    .then(c => res.json(c))
                    .catch(err => {
                        res.send('An error occured when saving lesson data')
                    });

            })
            .catch(err => res.send('An error occured when finding company id'));

    }

    async UserPOST(req: Request, res: Response) {

        let companyRes = await company.find({ name: req.body.company }, { _id: 1 });

        if (companyRes.length > 0) {
            let userModel = new user({
                name: req.body.name,
                company: companyRes[0]._id
            });

            userModel
                .save()
                .then(c => res.json(c))
                .catch(err => res.send("An error occured when saving user data"));
        } else {
            res.send("Company not found");
        }

    }

    CompanyPOST(req: Request, res: Response) {
        let companyModel = new company({ name: req.body.name });

        companyModel
            .save()
            .then(c => res.json(c))
            .catch(err => res.send('An error occured when saving company data'));

    }

    async PendingPercentage(req: Request, res: Response) {

        let companyParam = req.params.company,
            pendingPercentage = await lessonUserMapping.aggregate([{
                $facet: {
                    LessonUserMappingTotal: [
                        { $match: { company: companyParam } },
                        { $group: { _id: { user: "$user", lesson: "$lesson" } } },
                        { $count: "total" }
                    ],
                    LessonPendersTotal: [
                        { $match: { company: companyParam, finished: null } },
                        { $group: { _id: { user: "$user", lesson: "$lesson" } } },
                        { $count: "total" }
                    ]
                }
            },
            {
                $project: {
                    LessonPendersTotal: { $arrayElemAt: ["$LessonPendersTotal.total", 0] },
                    LessonUserMappingTotal: { $arrayElemAt: ["$LessonUserMappingTotal.total", 0] }
                }
            },
            {
                $project: {
                    percentage: {
                        $multiply: [{ $divide: ["$LessonPendersTotal", "$LessonUserMappingTotal"] }, 100]
                    }
                }
            }]);

        res.status(200).send(`The pending percentage is ${pendingPercentage[0].percentage}%`);
    }

    async ParticipationPercentage(req: Request, res: Response) {

        let companyParam = req.params.company,
            participationPercentage = await lessonUserMapping.aggregate([{
                $facet: {
                    LessonUserMappingTotal: [
                        { $match: { company: companyParam } },
                        { $group: { _id: { user: "$user", lesson: "$lesson" } } },
                        { $count: "total" }
                    ],
                    LessonStartersTotal: [
                        { $match: { company: companyParam, started: { $ne: null } } },
                        { $group: { _id: { user: "$user", lesson: "$lesson" } } },
                        { $count: "total" }
                    ]
                }
            },
            {
                $project: {
                    LessonStartersTotal: { $arrayElemAt: ["$LessonStartersTotal.total", 0] },
                    LessonUserMappingTotal: { $arrayElemAt: ["$LessonUserMappingTotal.total", 0] }
                }
            },
            {
                $project: {
                    percentage: {
                        $ifNull: [
                            { $multiply: [{ $divide: ["$LessonStartersTotal", "$LessonUserMappingTotal"] }, 100] },
                            0
                        ]
                    }
                }
            }]);

        res.status(200).send(`The participation percentage is ${participationPercentage[0].percentage}%`);
    }

    async CompletionPercentage(req: Request, res: Response) {

        let companyParam = req.params.company,
            completionPercentage = await lessonUserMapping.aggregate([{
                $facet: {
                    LessonUserMappingTotal: [
                        { $match: { company: companyParam } },
                        { $group: { _id: { user: "$user", lesson: "$lesson" } } },
                        { $count: "total" }
                    ],
                    LessonFinishersTotal: [
                        { $match: { company: companyParam, finished: { $ne: null } } },
                        { $group: { _id: { user: "$user", lesson: "$lesson" } } },
                        { $count: "total" }
                    ]
                }
            },
            {
                $project: {
                    LessonFinishersTotal: { $arrayElemAt: ["$LessonFinishersTotal.total", 0] },
                    LessonUserMappingTotal: { $arrayElemAt: ["$LessonUserMappingTotal.total", 0] }
                }
            },
            {
                $project: {
                    percentage: {
                        $multiply: [{ $divide: ["$LessonFinishersTotal", "$LessonUserMappingTotal"] }, 100]
                    }
                }
            }]);

        res.status(200).send(`The completion percentage is ${completionPercentage[0].percentage}%`);
    }
}