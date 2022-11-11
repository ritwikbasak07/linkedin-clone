import styled from "styled-components"

const RightSide = (props) => {
    return (
        <Container>
            <FollowCard>
                <Title>
                    <h2>Add to your feed</h2>
                    <img src="/images/feed-icon.svg" alt="" />
                </Title>
                <FeedList>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#Linkedin</span>
                            <button>Follow</button>
                        </div>
                    </li>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#Youtube</span>
                            <button>Follow</button>
                        </div>
                    </li>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#Facebook</span>
                            <button>Follow</button>
                        </div>
                    </li>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#Instagram</span>
                            <button>Follow</button>
                        </div>
                    </li>
                </FeedList>
                <Recommendation>
                    View all recommendations
                    <img src="/images/right-icon.svg" alt="" />
                </Recommendation>
            </FollowCard>
            <BannerCard>
                <img src="/images/banner.jpg" alt="" />
            </BannerCard>
        </Container>
    )
}

const Container = styled.div`
    grid-area: rightside;
`

const FollowCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    padding: 12px;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
`

const FeedList = styled.ul`
    margin-top: 16px;
    li {
        display: flex;
        align-items: center;
        position: relative;
        font-size: 14px;
        margin: 12px 0;
        & > div {
            display: flex;
            flex-direction: column;
        }
        button {
            margin-top: 5px;
            background-color: transparent;
            outline: none;
            border: 1px solid rgba(0, 0, 0, 0.15);
            padding: 5px 16px;
            border-radius: 15px;
            color: rgba(0, 0, 0, 0.6);
            font-size: 12px;
            cursor: pointer;
        }
    }
`

const Avatar = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #000;
`

const Recommendation = styled.a`
    color: #0a66c2;
    display: flex;
    align-items: center;
    font-size: 14px;
`

const BannerCard = styled(FollowCard)`
    img {
        width: 100%;
        height: 100%;
    }
`

export default RightSide
