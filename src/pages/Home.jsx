import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';

const CATEGORIES = [
  {
    title: 'PC1',
    cards: [
      {
        links: [
          { title: 'ALGORITHMES AND STATIC DATA STRUCTURES', url: 'https://drive.google.com/drive/folders/1BXjG_XIqO5DsJ1h9OLC65CG921kyO3Su' },
          { title: 'NETWORK FOUNDATION 1', url: 'https://drive.google.com/drive/folders/1Bew2cP63FJFRcgATEm6nNfy7Z7lIjACK' },
          { title: 'ENGLISH', url: 'https://drive.google.com/drive/folders/1BidHILVGas5Kn8Ue9unj2JkbgNrd_OLd  ' },
          { title: 'ALGEBRA 1', url: 'https://drive.google.com/drive/folders/1BUOxfn6ISu9Z0VYHF8LtY018h3NB8nDT' },
          { title: 'MATHEMATICAL ANALYSIS 1', url: 'https://drive.google.com/drive/folders/1BIQQi17ZCYRKJsAhL_FK3zxBXcdF2Gw2' },
          { title: 'ARCHITECTURE OF COMPUTERS 1', url: 'https://drive.google.com/drive/folders/1BOXKp-dLC77vujXuuNfa5hHIq0-jRUy1' },
          { title: 'INTRODUCTION TO OPERATING SYSTEM 1', url: 'https://drive.google.com/drive/folders/1BiS6f1PEFfBKttrGCN7yUsy0d8WX4zi9' },
          { title: 'ELECTRICITY', url: 'https://drive.google.com/drive/folders/1BaZEL7eWWXFO-0oFhOcn3ktvVHONAFvw' }
        ]
      },
      {
        links: [
          { title: 'ALGORITHMES AND DYNAMIC DATA STRUCTURES', url: 'https://drive.google.com/drive/folders/1CXlG8N36i_fVQCvSq4_DvFGfOkAESg6Z' },
          { title: 'NETWORK FOUNDATION 2', url: 'https://drive.google.com/drive/folders/1CAj91MyJKUtO8vPVkoi2oXl6LmvsGT5W' },
          { title: 'ENGLISH', url: 'https://drive.google.com/drive/folders/1CR-YAveQG7GC9Zj-Ox62qzu5kPGP3M9t' },
          { title: 'ALGEBRA 2', url: 'https://drive.google.com/drive/folders/1CBhHrtjnYnaY5Hl_0JMM3csvwqrzJ_qW' },
          { title: 'MATHEMATICAL ANALYSIS 2', url: 'https://drive.google.com/drive/folders/1CIC47es5PWZctilqmcjnIMNpT7DyrATQ' },
          { title: 'GRAPH THEORY', url: 'https://drive.google.com/drive/folders/1CIVfD1bb3Hc8RmKouYOOb2xVnIMq5XEl' },
          { title: 'INTRODUCTION TO OPERATING SYSTEM 2', url: 'https://drive.google.com/drive/folders/1CLnViab6TBfED5Hbuibsb72mOGM5rIwQ' },
          { title: 'ELECTRONICS', url: 'https://drive.google.com/drive/folders/1CRMgG-KHMnZG9sddp4uTN1nk_XpHnfXm' }
        ]
      }
    ]
  },
  {
    title: 'PC2',
    cards: [
      {
        links: [
          { title: 'UNKNOWN', url: '#' }
        ]
      },
      {
        links: [
          { title: 'UNKNOWN', url: '#' }
        ]
      }
    ]
  },
  {
    title: 'SC1',
    cards: [
      {
        links: [
          { title: 'UNKNOWN', url: '#' }
        ]
      },
      {
        links: [
          { title: 'UNKNOWN', url: '#' }
        ]
      }
    ]
  },
  {
    title: 'SC2',
    cards: [
      {
        links: [
          { title: 'UNKNOWN', url: '#' }
        ]
      },
      {
        links: [
          { title: 'UNKNOWN', url: '#' }
        ]
      }
    ]
  },
  {
    title: 'SC3',
    cards: [
      {
        links: [
          { title: 'UNKNOWN', url: '#' }
        ]
      },
      {
        links: [
          { title: 'UNKNOWN', url: '#' }
        ]
      }
    ]
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-cyber-black">
      <Hero />
      
      <div className="container mx-auto px-4">
        <div className="space-y-20 py-12">
          <SearchBar />
          {CATEGORIES.map((category) => (
            <CategorySection
              key={category.title}
              title={category.title}
              cards={category.cards}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 