"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const company_1 = require("../models/company");
const lesson_1 = require("../models/lesson");
const user_1 = require("../models/user");
const companyLessonMapping_1 = require("../models/companyLessonMapping");
const lessonUserMapping_1 = require("../models/lessonUserMapping");
class Controllers {
    AddLesson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let companyRes = yield company_1.company.find({ name: req.body.company }, { _id: 1 });
            let lessonRes = yield lesson_1.lesson.find({ name: req.body.lesson }, { _id: 1 });
            if (companyRes.length > 0 && lessonRes.length > 0) {
                let companyLessonMappingModel = new companyLessonMapping_1.companyLessonMapping({
                    company: companyRes[0]._id,
                    lesson: lessonRes[0]._id
                });
                companyLessonMappingModel
                    .save()
                    .then(c => res.json(c))
                    .catch(err => res.send('An error occured when mapping company to lessons'));
            }
            else {
                res.send('An error occured when mapping company to lessons');
            }
        });
    }
    AssignLessonToUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userRes = yield user_1.user.find({ name: req.body.user }, { _id: 1, name: 1 });
            let lessonRes = yield lesson_1.lesson.find({ name: req.body.lesson }, { _id: 1, name: 1, company: 1 });
            let companyRes = yield company_1.company.find({ _id: lessonRes[0].company }, { _id: 1, name: 1 });
            if (userRes.length > 0 && lessonRes.length > 0) {
                let lessonUserMappingModel = new lessonUserMapping_1.lessonUserMapping({
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
            }
            else {
                res.send('An error occured while assigning lesson to user');
            }
        });
    }
    LessonPOST(req, res) {
        company_1.company.find({ name: req.body.company }, { _id: 1 })
            .then(companyId => {
            let lessonModel = new lesson_1.lesson({
                name: req.body.name,
                company: companyId[0]._id
            });
            lessonModel
                .save()
                .then(c => res.json(c))
                .catch(err => {
                res.send('An error occured when saving lesson data');
            });
        })
            .catch(err => res.send('An error occured when finding company id'));
    }
    UserPOST(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let companyRes = yield company_1.company.find({ name: req.body.company }, { _id: 1 });
            if (companyRes.length > 0) {
                let userModel = new user_1.user({
                    name: req.body.name,
                    company: companyRes[0]._id
                });
                userModel
                    .save()
                    .then(c => res.json(c))
                    .catch(err => res.send("An error occured when saving user data"));
            }
            else {
                res.send("Company not found");
            }
        });
    }
    CompanyPOST(req, res) {
        let companyModel = new company_1.company({ name: req.body.name });
        companyModel
            .save()
            .then(c => res.json(c))
            .catch(err => res.send('An error occured when saving company data'));
    }
    PendingPercentage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let companyParam = req.params.company, pendingPercentage = yield lessonUserMapping_1.lessonUserMapping.aggregate([{
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
        });
    }
    ParticipationPercentage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let companyParam = req.params.company, participationPercentage = yield lessonUserMapping_1.lessonUserMapping.aggregate([{
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
        });
    }
    CompletionPercentage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let companyParam = req.params.company, completionPercentage = yield lessonUserMapping_1.lessonUserMapping.aggregate([{
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
        });
    }
}
exports.Controllers = Controllers;
//# sourceMappingURL=controllers.js.map