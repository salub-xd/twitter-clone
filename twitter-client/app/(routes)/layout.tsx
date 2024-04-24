import { Container } from "@/components/ui/container";
import { Leftbar } from "./home/components/leftbar";
import Rightbar from "./home/components/rightbar";
import { useCurrentUser } from "@/hooks/user";

export default async function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container>
            <div className='w-full flex flex-row items-center justify-center lg:justify-center'>
                <div className='border-r w-28 lg:w-[300px] hidden sm:flex'>
                    <Leftbar />
                </div>
                {children}
                <div className='hidden lg:block lg:w-[300px] border-r'>
                    <Rightbar />
                </div>
            </div>
        </Container>
    );
}





