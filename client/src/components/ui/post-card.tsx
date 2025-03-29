import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, MessageSquare } from 'lucide-react';
import { Post } from "@/types";
import { useSavedItems } from '@/hooks/useSavedItems';
import { useToast } from '@/hooks/use-toast';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { saveItem, isItemSaved, removeSavedItem } = useSavedItems();
  const [isSaved, setIsSaved] = useState(() => isItemSaved('post', post.id));
  const { toast } = useToast();

  const handleSave = async () => {
    if (isSaved) {
      await removeSavedItem('post', post.id);
      setIsSaved(false);
      toast({
        title: "Removed from saved items",
        description: "Post has been removed from your saved items",
      });
    } else {
      await saveItem('post', post.id, post);
      setIsSaved(true);
      toast({
        title: "Saved for later",
        description: "Post has been added to your saved items",
      });
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition">
      <CardContent className="p-0">
        <div className="flex items-start mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 flex-shrink-0 overflow-hidden">
            {post.authorImage ? (
              <img 
                src={post.authorImage} 
                alt={post.author} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                <span className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                  {post.author.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold">{post.author}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-500">{post.position} • {post.timePosted}</p>
          </div>
        </div>
        <p className="text-sm mb-3">{post.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{post.reactions} reactions • {post.comments} comments</span>
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:text-[#0A66C2] transition p-1 h-auto"
              onClick={handleSave}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current text-[#0A66C2]" : ""}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:text-[#0A66C2] transition p-1 h-auto"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
