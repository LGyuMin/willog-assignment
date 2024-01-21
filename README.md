# 프로젝트 설명

- Unsplash API를 사용해 만든 프론트 엔드 과제로 Next.js + TypeScript 기반의 프로젝트입니다.
- Functional Component 방식을 사용했으며, Tailwind를 사용해 스타일 작업을 했습니다.
- Unsplash API를 사용해 북마크 기능을 구현하려면 인증을 해야하는데, 인증 API 호출 시 500 에러가 발생하여(Unsplash 개발팀에 메일로 문의했으나 답변을 받지 못함) 북마크 사진을 Client State로 관리하여 해당 기능을 구현했습니다.
- 인증관련 로직은 src/hooks/useAuth.ts에 작성해 두었으니 참고 부탁드립니다.
- [결과물 보러가기](https://willog-assignment.vercel.app/)

# 프로젝트 세팅

```
npm install
```

# 실행

- 개발 모드

```
npm run dev
```

- 배포

```
npm run build
```
