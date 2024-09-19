Src 내 application / core / infrastrure 로 구성되어 있음  
- Application : 외부의 Client와 인터페이스하는 부분으로 서버 애플리케이션의  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                기본 설정, 컨트롤러, 예외, 인터셉터, 인증 및 인가 등을 다룬다
- Core : UseCase와 CQERS(Command, Query, Event)에 대한 인터페이스 및 구현체를   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         담당한다. 또한, 응답 코드, 응답 구조체, 비지니스 도메인, 유효성 검사 코드가 포함된다. 
- Infrastructure : Core에서 사용한 모든 Port들에 대한 구현부를 포함한다.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   이에, CQERS에 대한 구현부, 도메인 ORM, persistence Layer, 그리고 환경 변수 등을
                   포함한다. 
                    
## Application 
소스가 직관적이기에 자세한 설명 생략

## Core
다른 부분은 코드 레벨에서 이해가 충분히 될 것으로 보이며 좀 어려운 CQERS 프로세스에 대해  
로직에 대해 설명한다. 
  - core/common/message/port  
    : NestjsBusAdapter에서 implements하며 해당 인터페이스로 실 구현부를 주입 받음
  - core/common/message/{handler}  
    : Base Handler로 각 도메인에서는 이를 상속받아 Custom한 Handler Interface를  
      여러 개 만든다(ex. GetUserPreviewQueryHandler).
  - core/domain/user/port/handler
    : Domain 별 Custom한 Handler Interface
  - core/service/user/Handler...
    : Custom한 Handler Interface를 구현한 서비스. Infrastructure에서 실제로
      의존성 주입도어 호출된다.(ex.NestWrapperGetUserPreviewQueryHandler)
      
## Infrastructure 
소스가 직관적이기에 자세한 설명 생략

