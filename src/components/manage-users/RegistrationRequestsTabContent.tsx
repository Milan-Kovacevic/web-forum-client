import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  acceptRegistrationRequest,
  blockRegistrationRequest,
  loadRegistrationRequests,
} from "@/redux/users/userThunks";
import { useEffect } from "react";
import RegistrationRequestItem from "./RegistrationRequestItem";
import { clearRequestsAction } from "@/redux/users/requestsSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";

export default function RegistrationRequestsTabContent() {
  const { loadingRequests, registrationRequests, requestAction } =
    useAppSelector((state) => state.requests);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadRegistrationRequests());
  }, []);

  useEffect(() => {
    if (requestAction) {
      dispatch(loadRegistrationRequests());
      dispatch(clearRequestsAction());
    }
  }, [requestAction]);

  function handleRequestProcessed(
    requestId: string,
    isAccepted: boolean
  ): void {
    if (isAccepted) dispatch(acceptRegistrationRequest(requestId));
    else dispatch(blockRegistrationRequest(requestId));
  }

  return (
    <TabsContent value="requests" className="h-full w-full">
      {((!loadingRequests && registrationRequests.length > 0) ||
        loadingRequests) && (
        <div className="w-full h-full">
          <div className="flex flex-col gap-2 px-1">
            {loadingRequests ? (
              <RegistrationRequestsLoader />
            ) : (
              registrationRequests.map((item) => (
                <RegistrationRequestItem
                  request={item}
                  key={item.requestId}
                  onRequestProcessed={handleRequestProcessed}
                />
              ))
            )}
          </div>
        </div>
      )}
    </TabsContent>
  );
}

const RegistrationRequestsLoader = () => {
  const numOfItems = 12;
  const loadingItems = Array.from({ length: numOfItems }, (_, index) => index);

  return (
    <div className="flex flex-col gap-2">
      {loadingItems.map((item) => (
        <div
          key={item}
          className="flex flex-col justify-end gap-1.5 w-full border rounded-lg py-4 px-4 transition-colors"
        >
          <div className="flex-1 flex flex-row gap-3.5 w-full">
            <div className="flex flex-col flex-wrap items-center gap-1">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-full rounded-xl" />
            </div>

            <div className="flex-1 self-stretch flex flex-wrap items-center justify-between gap-1 mt-1">
              <div className="flex flex-col gap-3 flex-1">
                <Skeleton className="h-3 w-1/3" />
                <div className="flex flex-col gap-1 w-full">
                  <Skeleton className="h-4 w-8/12" />
                  <Skeleton className="h-4 w-10/12" />
                </div>
              </div>
              <div className="flex justify-center items-center mr-1 sm:mt-0 mt-4 gap-1">
                <Skeleton className="h-7 w-7 rounded-sm" />
                <Skeleton className="h-7 w-7 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
