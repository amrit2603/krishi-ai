import React from 'react';
import { Post } from '../types';
import { ThumbsUp, MessageCircle, Share2, CheckCircle } from 'lucide-react';

interface Props {
  translations: any;
}

const CommunityFeed: React.FC<Props> = ({ translations }) => {
  const t = translations.community;
  
  const posts: Post[] = [
    {
      id: '1',
      author: 'Ramesh Kumar',
      role: 'Expert Farmer',
      content: 'Found early signs of blight on my tomatoes. Used Copper Oxychloride as suggested by the app. Results are good after 3 days!',
      image: 'https://picsum.photos/seed/tomato-leaf/400/300',
      likes: 124,
      comments: 18,
      timeAgo: '2h ago'
    },
    {
      id: '2',
      author: 'Anita Desai',
      role: 'Agronomist',
      content: 'Alert for Nashik region: High humidity this week. Please check your grapevines for downy mildew.',
      likes: 89,
      comments: 5,
      timeAgo: '5h ago'
    }
  ];

  return (
    <div className="space-y-4 pb-20">
      <div className="sticky top-0 bg-gray-50/95 backdrop-blur z-10 py-2 px-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <p className="text-gray-500 text-sm">{t.desc}</p>
      </div>

      <div className="px-4 space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-agri-100 flex items-center justify-center text-agri-700 font-bold">
                {post.author[0]}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-semibold text-gray-900">{post.author}</h3>
                  {post.role === 'Expert Farmer' && <CheckCircle size={14} className="text-blue-500" fill="currentColor" color="white" />}
                </div>
                <p className="text-xs text-gray-500">{post.role} • {post.timeAgo}</p>
              </div>
            </div>
            
            <p className="px-4 pb-3 text-gray-800 text-sm leading-relaxed">
              {post.content}
            </p>

            {post.image && (
              <img src={post.image} alt="Post content" className="w-full h-64 object-cover bg-gray-100" />
            )}

            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-50">
              <button className="flex items-center gap-2 text-gray-500 hover:text-agri-600 transition-colors">
                <ThumbsUp size={18} />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                <MessageCircle size={18} />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
