import Container from "./Container";

const WeatherSkeleton = () => {
  return (
    <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4 animate-pulse">
      <section className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-1">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="h-5 w-36 bg-gray-300 rounded"></div>
          </div>

          <Container className="gap-4 sm:gap-6 px-6 flex items-center  flex-col sm:flex-row">
            <div className="flex flex-col px-4 space-y-2">
              <div className="h-14 w-18 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
              <div className="h-4 w-18 bg-gray-300 rounded"></div>
            </div>
            <div className="flex gap-4 sm:gap-6 overflow-x-auto w-full justify-between pr-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-6 items-center text-xs font-semibold"
                >
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-10 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </Container>
        </div>

        <div className="flex gap-4  flex-col sm:flex-row">
          <Container className="w-fit flex flex-col items-center px-4 space-y-3">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
          </Container>
          <Container className="bg-yellow-300/80 px-6 gap-4 flex justify-between overflow-x-auto w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <SingleWeatherDetailsSkeleton key={index} />
            ))}
          </Container>
        </div>
      </section>

      <section className="flex w-full flex-col gap-4">
        <div className="h-6 w-24 bg-gray-300 rounded"></div>
        {Array.from({ length: 5 }).map((_, index) => (
          <Container key={index} className="gap-4 flex-col sm:flex-row">
            <section className="flex gap-8 items-center px-4">
              <div className="flex flex-col gap-1 items-center space-y-2">
                <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </div>
              <div className=" space-y-2">
                <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                <div className="text-xs h-3 w-16 bg-gray-300 rounded"></div>
                <div className="h-4 w-14 bg-gray-300 rounded"></div>
              </div>
            </section>
            <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <SingleWeatherDetailsSkeleton key={index} />
              ))}
            </section>
          </Container>
        ))}
      </section>
    </main>
  );
};

export default WeatherSkeleton;

function SingleWeatherDetailsSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-4 items-center text-xs font-semibold to-black/80">
      <div className="h-4 w-16 bg-gray-300 rounded"></div>
      <div className="h-14 w-14 bg-gray-300 rounded-full"></div>
      <div className="h-4 w-10 bg-gray-300 rounded"></div>
    </div>
  );
}
