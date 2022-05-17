import { Link } from "react-router-dom";
import Login from "./Login";

const Header = () => {
    return (
        <div className="container">
            <header className="blog-header py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                        <a className="link-secondary" href="https://github.com/gabrielyoon7/GIDAL">고객센터</a>
                    </div>
                    <div className="col-4 text-center">
                        <Link to="/"><div className="blog-header-logo text-dark" href="/">기록의 달인</div></Link>
                    </div>
                    {/* <div className="col-4 d-flex justify-content-end align-items-center">
                        <a className="btn btn-sm btn-outline-secondary" href="#">로그인</a>
                    </div> */}
                    {/* <!-- Button trigger modal --> */}
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            로그인
                        </button>

                    </div>
                </div>
            </header>
            <div className="nav-scroller py-1 mb-2">
                {/* 이 부분은 로그인 한 사람에게만 뜨면 좋겠음 */}
                <nav className="nav d-flex justify-content-between">
                    <a className="p-2 link-secondary" href="#">마이다이어리</a>
                    <a className="p-2 link-secondary" href="#">피드</a>
                    <a className="p-2 link-secondary" href="#">통계</a>
                    <a className="p-2 link-secondary" href="#">할일</a>
                    <a className="p-2 link-secondary" href="#">설정</a>
                </nav>
            </div>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">로그인</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <Login/>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Header;