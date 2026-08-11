import { AllCommunityModule } from "ag-grid-community";
import UserBooking from "../features/booking/components";
import { AgGridProvider } from "ag-grid-react";
const modules = [AllCommunityModule];
export default function BookingPage() {
  return (
    <>
      <AgGridProvider modules={modules}>
        <UserBooking></UserBooking>
      </AgGridProvider>
    </>
  );
}
