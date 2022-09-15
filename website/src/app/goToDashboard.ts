import { iUser } from "../../../server/src/users/users.dto";
import { AppService } from "./app.service";

export async function goToDashboard(app: AppService): Promise<boolean> {
  if (app.user == undefined) {
    try {
      let data = await validToken(app);
      app.user = data.user;
      return true;
    } catch (err) {
      return false;
    }
  } else return true;
}

function validToken(app: AppService) {
  return new Promise<data>((resolve, reject) => {
    app.get<data>("auth/validToken").subscribe({
      next: (res: data) => {
        resolve(res);
      },
      error: (err: any) => {
        reject(err);
      }
    });
  });
}

interface data {
  user: iUser
}