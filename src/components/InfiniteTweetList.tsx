import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileImage } from "./ProfileImage";
import moment from "moment";
import { useSession } from "next-auth/react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
};

type infiniteTweetListProps = {
  tweets?: Tweet[];
  isError: boolean;
  isLoading: boolean;
  hasMore: boolean;
  fetchNewTweets: () => Promise<unknown>;
};

const InfiniteTweetList = ({
  tweets,
  isError,
  isLoading,
  hasMore,
  fetchNewTweets,
}: infiniteTweetListProps) => {
  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading..</h1>;

  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={"Loading...."}
      >
        {tweets.map((tweet) => {
          return <TweetCard key={tweet.id} {...tweet} />;
        })}
      </InfiniteScroll>
    </ul>
  );
};

export default InfiniteTweetList;

const TweetCard = ({
  id,
  content,
  createdAt,
  likeCount,
  likedByMe,
  user,
}: Tweet) => {
  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow  flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${user.id}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {moment(createdAt).format("DD/MM/YY")}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <HeartButton likedByMe={likedByMe} likeCount={likeCount} />
      </div>
    </li>
  );
};

type HeartButtonType = {
  likedByMe: boolean;
  likeCount: number;
};
const HeartButton = ({ likedByMe, likeCount }: HeartButtonType) => {
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;
  if (session.status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    );
  }
  return <h1>Heart</h1>;
};
