# MOODÉA

스킨케어, 뷰티 제품을 판매하는 웹사이트 컨셉의 React 프로젝트입니다.  
퍼블리싱 및 프론트엔드 UI/UX 구조 학습을 목적으로 제작되었으며,  
실제 쇼핑몰과 유사한 레이아웃과 인터랙션을 구현하고 있습니다.

## 프로젝트 소개
- 다양한 뷰티 제품을 확인하고, 신상품과 인기 상품을 탐색할 수 있는 UI 제공
- React & Vite 기반으로 빠른 개발 환경 구축
- 반응형 레이아웃 및 기본적인 쇼핑몰 UI/UX 구현

## 업데이트 내역
### 2025-10-06
- Supabase DB 연동: 기존 로컬 JSON 파일을 fetch로 불러와 바인딩하던 방식을 Supabase 데이터베이스를 활용한 실시간 데이터 통신 방식으로 전환

## 파일 구조 변경

```
src/
 ├─ components/
 │    ├─ main/               # 메인 페이지 전용
 │    │   ├─ CarouselSlider.jsx
 │    │   ├─ NewProductList.jsx
 │    │   └─ ...
 │    ├─ HeaderSectionCategory/           # 헤더섹션 카테고리 컴포넌트 (컴포넌트 제작소)
 │    │   ├─ Skincare/
 │    │   │   └─ SkincareList.jsx
 │    │   └─ category.css
 │    │   
 │    ├─ common/             # 공용 UI
 │    │   ├─ AdPopup.jsx
 │    │   ├─ Footer.jsx
 │    │   └─ ...
 │    └─ Recycling/          # 재활용 컴포넌트
 │        └─ BestSlider.jsx
 │        └─ HeaderSectionCategory.jsx
 │
 └─ pages/                # 컴포넌트 대표 페이지 
     ├─ MainPage.jsx
     ├─ SkincarePage.jsx
     ├─ CleansingPage.jsx
     └─ MakeupPage.jsx
     └─ HaircarePage.jsx

```

## 컴포넌트 제작 흐름

```

컴포넌트 제작 흐름

1. 컴포넌트 제작소 (특정 전용 컴포넌트 제작)
- 각 페이지/기능에 맞는 전용 컴포넌트 제작
- 예: SkincareList.jsx

2. 제작된 컴포넌트 재활용 (범용성 확보)
- 공통 UI/로직을 추출해서 props 기반 컴포넌트로 리팩터링
- 불필요한 중복 코드를 줄이고, 여러 페이지에서 사용할 수 있도록 수정
- 예: HeaderSectionCategory.jsx
- props: categoryName, categoryBio, jsonFile, arrayName, basePath 등

3. 컴포넌트 대표 페이지에서 데이터 바인딩 (화면 구성)
- 실제 페이지 단에서 데이터 주입
- Supabase DB에서 데이터를 불러와 Recycling 컴포넌트에 props 전달
- 여러 개의 공용 컴포넌트를 조합해서 하나의 완성된 페이지를 구성

```

## 구현 기능 (메인페이지)
- 상단 메뉴: 회원가입, 로그인, 주문조회, 찜한상품, 고객지원 등  
- 번역 기능: GTranslate플러그인을 이용한 4개국의 번역 감지 위젯 추가
- 헤더 섹션: 사이트 타이틀 및 상품 카테고리(스킨케어, 클렌징, 메이크업, 헤어케어, 바디케어)  
- 쿠폰 팝업: 회원가입 시 할인 쿠폰 안내, 체크박스로 창 닫기  
- 캐러셀 슬라이더: 이미지 배너 슬라이드, 인디케이터 클릭 시 이동  
- 카테고리 섹션: Supabase DB 데이터를 기반으로 카테고리 목록 표시
- 신상품 섹션: Supabase DB 데이터를 기반으로 신상품 목록 표시  
- 더보기 버튼: 클릭 시 상품 10개씩 추가 로드, 최대 2회까지만 표시 (2회 클릭 시 버튼 사라짐)
- 베스트 셀러 섹션: Swiper 라이브러리를 활용하여 베스트 상품 카드 박스를 슬라이드 형식으로 구현
- 기프트 세트 섹션: 배너와 스크롤형 상품 목록을 함께 배치해, 선물 세트를 한눈에 확인할 수 있도록 구현
- 브랜드 스토리 섹션: IntersectionObserver API를 활용한 스크롤 on/off 애니메이션
- 리뷰 섹션: 카드 형식으로 상품 사진, 리뷰 텍스트, 사용자 닉네임, 별점 표시 및 "모든 후기 보기" 버튼 구현
- 소셜미디어 섹션: Display Grid를 이용하여 이미지를 나누어 브랜드 인스타 그램으로 이동 하는 섹션 구현
- 푸터 섹션: 푸터 섹션 구현 
- 반응형 레이아웃: 화면 크기에 따라 캐러셀 및 상품 섹션 높이와 배치 조정  

## 구현 기능 (헤더 섹션)
- 상품 정렬 기능: 상품명순, 낮은가격순, 높은가격순, 추천순 정렬필터 기능 구현
- 페이지네이션 기능: 리액트 라우터를 이용한 페이지네이션 구현 (1,2,3 페이지)
- 스킨케어, 클렌징, 메이크업, 헤어케어 페이지 구현: 컴포넌트 재활용과 데이터바인딩을 이용한 페이지 구현

## 사용 기술
- **React**: UI 컴포넌트 기반 개발  
- **Vite**: 빠른 빌드 환경  
- **React Router**: SPA 페이지 전환 및 URL 관리
- **CSS / JSX**: 레이아웃 및 스타일링  
- **JavaScript (ES6)**: 상태 관리 및 이벤트 처리  
- **Font Awesome & Google Fonts**: 아이콘 및 폰트 적용  
- **Supabase**: 실시간 DB 연동 데이터 바인딩 (상품 정보)

## 기획
| 와이어프레임 | 디자인시안 |
|---|---|
|<img width="500" alt="와이어프레임" src="https://raw.githubusercontent.com/ouusagi/MOODEA/main/src/assets/Wireframe-mainpage.png" />|<img width="700" alt="시안" src="https://raw.githubusercontent.com/ouusagi/MOODEA/main/src/assets/mainpage.png" />|

## 설치 및 실행
```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev


⚠️ 현재 프로젝트는 미완성 상태이며, 일부 UI/기능은 구현 중입니다.