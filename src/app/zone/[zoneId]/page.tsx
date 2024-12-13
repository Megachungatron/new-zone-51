// app/zone/[zoneId]/page.tsx
'use client';


export const runtime = 'edge';

import { useSearchParams } from 'next/navigation';
import HomePage from "@/app/page";
import AddPlatePage from "@/app/add-plate/page";
import SelectRatePage from "@/app/select-rate/page";
import PaymentPage from "@/app/payment/page";

const ZonePage = () => {
    const searchParams = useSearchParams();
    const originalPath = searchParams.get('originalPath');

    // Handle rendering based on the originalPath
    switch (originalPath) {
        case null: // Default case when no query parameter is provided
        case '/':
            return <HomePage />;
        case '/add-plate':
            return <AddPlatePage />;
        case '/select-rate':
            return <SelectRatePage />;
        case '/payment':
            return <PaymentPage />;
        default:
            return <div>Page not found</div>;
    }
};

export default ZonePage;
