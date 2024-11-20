import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type MarketProps = {
    marketplaceName: string;
    type: string;
    email: string;
    contactNumber: string;
    capacity: string;
    uid: string;
};

type MarketPageProps = {
    singlemarketplace: MarketProps;
};

const MarketPage: React.FC<MarketPageProps> = ({ singlemarketplace }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!singlemarketplace) {
    return <div>Market not found</div>;
  }

  return (
    <div>
      please
    </div>
  );
};

/*
export const getStaticPaths: GetStaticPaths = async () => {
  const marketsRef = collection(db, 'markets');
  const snapshot = await getDocs(marketsRef);

  const paths = snapshot.docs.map((doc) => ({
    params: { marketName: doc.data().name.replace(/\s+/g, '-').toLowerCase() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<MarketPageProps> = async (context) => {
  const { marketName } = context.params!;
  const marketsRef = collection(db, 'markets');

  const q = query(
    marketsRef,
    where('name', '==', marketName!.replace(/-/g, ' '))
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return { props: { market: null } };
  }

  const marketData = snapshot.docs[0].data();

  return {
    props: {
      market: {
        name: marketData.name,
        description: marketData.description,
        location: marketData.location,
      },
    },
    revalidate: 10, // Revalidate the page every 10 seconds
  };
};
*/

export default MarketPage;
