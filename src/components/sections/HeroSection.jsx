import SectionCard from '../SectionCard';

export default function HeroSection() {
  return (
    <SectionCard
      id="hero"
      index={1}
      accent
      title="Hero"
      text="여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다."
    />
  );
}
