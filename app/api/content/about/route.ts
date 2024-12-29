import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { aboutData } from '@/app/o-nas/data';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'about' });
    
    if (!content?.content) {
      return NextResponse.json(aboutData);
    }

    return NextResponse.json(content.content);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json(aboutData);
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const data = await request.json();

    await db.collection('content').updateOne(
      { type: 'about' },
      { 
        $set: { 
          type: 'about',
          content: {
            hero: {
              title: data.hero.title,
              description: data.hero.description,
              images: data.hero.images?.map((image: string) => 
                image.replace(/\.(jpg|png)$/, '.webp')
              )
            },
            history: {
              title: data.history.title,
              sections: data.history.sections?.map((section: any) => ({
                content: section.content,
                image: section.image?.replace(/\.(jpg|png)$/, '.webp')
              }))
            },
            team: {
              title: data.team.title,
              members: data.team.members?.map((member: any) => ({
                name: member.name,
                position: member.position,
                image: member.image?.replace(/\.(jpg|png)$/, '.webp')
              }))
            },
            socialMedia: data.socialMedia
          }
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving about content:', error);
    return NextResponse.error();
  }
} 