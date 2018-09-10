"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers/controllers");
class Routes {
    mapRoutesToApp(app) {
        let Controller = new controllers_1.Controllers();
        app.route('/')
            .get((req, res) => {
            res.status(200).send('Welcome!');
        });
        app.route("/company")
            .post(Controller.CompanyPOST);
        app.route("/user")
            .post(Controller.UserPOST);
        app.route("/assignLessonToUser")
            .post(Controller.AssignLessonToUser);
        app.route("/lesson")
            .post(Controller.LessonPOST);
        app.route('/pendingPercentage/:company')
            .get(Controller.PendingPercentage);
        app.route('/participationPercentage/:company')
            .get(Controller.ParticipationPercentage);
        app.route('/completionPercentage/:company')
            .get(Controller.CompletionPercentage);
        app.route('/startLesson')
            .patch(Controller.StartLesson);
        app.route('/endLesson')
            .patch(Controller.EndLesson);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map