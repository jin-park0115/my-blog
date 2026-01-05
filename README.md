# 중요한 공부 포인트들

파일 시스템이 곧 Route가 된다.

---

## 1. File-based Routing
Next.js에서는 `app` 폴더 아래의 **폴더 구조**가 곧 웹사이트의 **주소(URL)**가 된다.
* **폴더명 = 주소**: `app/postwrite` 폴더를 만들면 `http://localhost:3000/postwrite` 주소가 자동으로 생성된다.
- 그 폴더 안에 `page.tsx`가 있어야 실제 화면이 렌더링이된다, 예: `app/postwrite/page.tsx`
* **Dynamic Routes**: `app/posts/[id]`처럼 대괄호를 사용하면, `id` 자리에 어떤 값이 들어와도 대응하는 **'가변 주소'**를 만들 수 있다.

---

## 2. API Routes (Route Handlers)
`app/api` 폴더도 라우팅 방식은 똑같지만 **목적**은 다르다.
- 주소 생성: `app/api/write` 폴더를 만들면 `http://localhost:3000/api/write`라는 API 주소가 생긴다.
- 여기서는 `page.tsx`가 아니라 **`route.ts`** 를 사용한다, 예: `app/api/write/route.ts`
- `GET`, `POST`, `PUT`, `DELETE` 등 HTTP메서드 이름을 함수명으로 사용해서 서버 로직을 구현한다.

---

## 💡 주요 배운 점
1.  **프론트엔드와 백엔드의 통합**: 별도의 서버 구축 없이 한 프로젝트 내에서 API까지 관리할 수 있어 생산성이 높다.
2.  **서버 사이드 기능 활용**: 브라우저에서 접근 불가능한 `fs`(File System) 모듈 등을 `route.ts`를 통해 안전하게 사용하여 데이터를 물리적 파일로 저장할 수 있다.
3.  **예외 처리**: 한글 파일명 등을 처리할 때 발생하는 인코딩 문제는 `decodeURIComponent`와 같은 함수로 해결해야 함을 배웠다.
