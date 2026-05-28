import { Suspense } from "react";
import CarouselEvent from "../features/carouselEvent/components";
import ProductSection from "../features/ProductSection/components";
import { productionSectionUri } from "../store/productionSection/productionSection";
export default function HomePage() {
  return (
    <>
      <div
        id="homePage"
        className="px-[10%] pt-[1rem] bg-[url(../BackgroundContent/bghomepage.png)] bg-center bg-auto bg-origin-border flex flex-col gap-y-[2rem] pb-[2rem]"
      >
        {/* static slider */}
        <CarouselEvent></CarouselEvent>

        {Object.keys(productionSectionUri).map((key) => {
          return (
            <Suspense key={key} fallback={<div>Loading...</div>}>
              <ProductSection
                contentSection={
                  productionSectionUri[Number(key)].contentSection
                }
                apiUrl={productionSectionUri[Number(key)].uriSection}
                keys={key}
              ></ProductSection>
            </Suspense>
          );
        })}
        {/* ranking 3 most favorite type of game */}
      </div>
    </>
  );
}
