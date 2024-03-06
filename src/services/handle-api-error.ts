import { AxiosError } from "axios";
import { toast } from "sonner";

type ApplicationError = {
  detail: string;
  status: number;
  title: string;
  type: string;
};

export const handleApiError = (error: AxiosError) => {
  var appError = error.response?.data as ApplicationError;
  if (error.code === "ERR_NETWORK") {
    toast.error("Oops, unexpected error occured", {
      description: "Unable to connect to web forum api server",
    });
  } else if (appError !== null || appError !== undefined) {
    toast.error(appError.title, {
      description: appError.detail,
    });
  }
};
