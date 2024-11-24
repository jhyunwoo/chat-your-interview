import DefaultLayout from "@/app/components/default-layout";

export default function HomePage() {
  return (
    <DefaultLayout className={'flex items-center justify-center'}>
      <div className={"text-2xl font-bold"}>Home Page</div>
    </DefaultLayout>
  );
}
