# 임대주택 보증금 상호전환 계산기

공공임대주택의 보증금과 임대료 간 상호전환을 계산해주는 웹 애플리케이션입니다.

## 🎯 프로젝트 개요

**보증금 ⇄ 임대료 변환 계산기**를 통해 LH, SH, GH 등 공공임대주택에서 보증금을 늘리거나 줄일 때의 임대료 변화를 정확하게 계산할 수 있습니다. 행복주택, 국민임대, 매입임대, 영구임대, 공공임대, 청년안심주택, 역세권 청년주택 등 다양한 임대주택 유형에 적용 가능합니다.

### 💡 주요 기능

1. **보증금 증가 모드** - 임대료를 보증금으로 전환
2. **보증금 감소 모드** - 보증금을 임대료로 전환
3. **비율 기반 계산** - 50%, 60%, 70% 또는 사용자 정의 비율
4. **금액 기반 계산** - 구체적인 전환 금액 설정 (100만원 단위)

## 🏗️ 기술 스택

- **프레임워크**: React 18.2.0
- **빌드 도구**: Create React App 5.0.1
- **스타일링**: CSS Modules
- **폰트**: Spoqa Han Sans Neo (한글 최적화)
- **배포**: GitHub Pages

## 🚀 시작하기

### 1. 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

### 2. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# GitHub Pages 배포
npm run deploy

# 테스트 실행
npm test
```

## 📁 프로젝트 구조

```bash
src/
├── App.js                      # 메인 애플리케이션 컴포넌트
├── App.css                     # 전역 스타일
├── index.js                    # React 앱 진입점
└── components/
    ├── Header/                 # 헤더 (모드 선택)
    │   ├── Header.js
    │   └── Header.module.css
    ├── DepositInput/           # 기본 보증금/임대료 입력
    │   ├── DepositInput.js
    │   └── DepositInput.module.css
    ├── ConvertDepositsInput/   # 전환 설정 (비율/금액)
    │   ├── ConvertDepositsInput.js
    │   └── ConvertDepositsInput.module.css
    ├── DepositResult/          # 계산 결과 표시
    │   ├── DepositResult.js
    │   └── DepositResult.module.css
    ├── MainContainer.js        # 레이아웃 컨테이너
    └── UI/
        ├── Card.js             # 재사용 가능한 카드 컴포넌트
        └── Card.module.css
```

### 코딩 규칙

- **컴포넌트**: 각 컴포넌트마다 독립적인 CSS Module 파일
- **스타일링**: CSS Modules를 통한 스코프 격리
- **상태 관리**: React Hooks (useState, useEffect) 활용
- **타이포그래피**: 한글 최적화 폰트 적용

## 💰 계산 로직

### 전환 이자율

- **보증금 증가 시**: 7% (연이율)
- **보증금 감소 시**: 3.5% (연이율)

### 계산 공식

```javascript
// 보증금 증가 (임대료 → 보증금)
신규보증금 = 기존보증금 + (월임대료 × 전환비율 × 12 ÷ 이자율)

// 보증금 감소 (보증금 → 임대료)
신규임대료 = 기존임대료 + (보증금감소액 × 이자율 ÷ 12)
```

## 🎨 디자인 시스템

### 색상 팔레트

- **UpColor**: #EB5374 (핑크)
- **DownColor**: #5673eb (블루)
- **Text**: #464D52 (다크 그레이)
- **Background**: #F3F4F5 (라이트 그레이)

### 반응형 디자인

- **Mobile First**: 모바일 우선 디자인
- **Breakpoints**: 태블릿, 데스크톱 대응
- **Touch Friendly**: 터치 인터페이스 최적화

## 🔧 개발 도구

### 성능 최적화

- **Source Maps**: 프로덕션에서 비활성화
- **Bundle Size**: Create React App 최적화 적용
- **Web Vitals**: 성능 모니터링

### SEO 최적화

- **Google Tag Manager**: 분석 도구 연동
- **Open Graph**: 소셜 미디어 공유 최적화
- **Sitemap**: 검색 엔진 최적화

## ⚠️ 주의사항

1. **계산 정확성**: 실제 임대차 계약 시 공공기관의 계산 공식을 반드시 확인하세요
2. **이자율 변동**: 정부 정책에 따라 전환 이자율이 변경될 수 있습니다
3. **브라우저 호환성**: 모던 브라우저에서 최적화되어 있습니다

## 🌐 배포 정보

- **라이브 사이트**: [http://ihateindex.github.io/deposit-calculator](http://ihateindex.github.io/deposit-calculator)
- **배포 플랫폼**: GitHub Pages
- **자동 배포**: `npm run deploy` 명령어로 원클릭 배포
