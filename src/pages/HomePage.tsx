import CarouselEvent from "../features/carouselEvent/components";
import ProductSection from "../features/ProductSection/components";

export default function HomePage() {
  return (
    <>
      <div
        id="homePage"
        className="px-[10%] pt-[1rem] bg-[url(./BackgroundContent/bghomepage.png)] bg-center bg-auto bg-origin-border flex flex-col gap-y-[2rem] pb-[2rem]"
      >
        {/* static slider */}
        <CarouselEvent></CarouselEvent>
        {/* best seller */}
        <ProductSection contentSection="Best Seller"></ProductSection>
        {/* top new game */}
        <ProductSection contentSection="Top New Game"></ProductSection>
        {/* top rating */}
        <ProductSection contentSection="Top Rating"></ProductSection>
        {/* ranking 3 most favorite type of game */}
      </div>
    </>
  );
}
