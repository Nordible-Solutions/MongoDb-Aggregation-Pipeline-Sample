import { Request, Response } from "express";
import { Controllers } from "../controllers/controllers";

export class Routes {
    public mapRoutesToApp(app): void {

        let Controller = new Controllers();
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send('Welcome!');
            });

        app.route("/company")
            .post(Controller.CompanyPOST)

        app.route("/addLesson")
            .post(Controller.AddLesson);

        app.route("/user")
            .post(Controller.UserPOST)

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

    }
}