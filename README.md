[![Release Notes](https://github.com/kanghyungmin/nestjs-ddd/actions/workflows/release.yml/badge.svg)](https://github.com/kanghyungmin/nestjs-ddd/actions/workflows/release.yml)

## 소 개 
 1) Port를 사용하여 최대한 layer간 의존성을 분리하는 구조로 작성되었으며  
    이에 코드에 대한 유지보수성 향상 / 테스트 코드 작성에 유리
 2) Usecase마다 하나의 서비스 로직을 생성하게끔 구성
 3) Oauth2(kakao), Jwt, 그리고 CQRS 등 많은 기능들에 대한 템플릿 작성
 4) (주요)기술 스택
    : Postgres / Typeorm

 ## 실행 순서 
 ```
 # DB Container Build & Deploy 
 docker-compose -f docker-compose.local.yaml up -d

 # Run Dev Server on local machine
 yarn start:local

 #To check, move on to http://localhost:3005/docs
 #처음 구동한다면 ORM에 대한 스키마 작업을 다음과 같이 해야한다.
 # 1) yarn migration:generate ./src/migrations/{name}
 # 2) yarn migration:run
 ```
 ## 프로젝트 구조
   - [Link](https://github.com/kanghyungmin/nestjs-ddd/blob/dev/PROJECT_SCHEME.md)
 ## API 작성 방법
   - [Link](https://github.com/kanghyungmin/nestjs-ddd/blob/dev/MAKE_LOGIC_API.md)
 
