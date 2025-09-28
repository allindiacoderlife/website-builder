import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/websites - Get all websites
export async function GET() {
  try {
    const websites = await prisma.website.findMany({
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(websites);
  } catch (error) {
    console.error('Error fetching websites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch websites' },
      { status: 500 }
    );
  }
}

// POST /api/websites - Create a new website
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, components, userId = 'demo-user' } = body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const website = await prisma.website.create({
      data: {
        title,
        description,
        slug: `${slug}-${Date.now()}`, // Add timestamp to ensure uniqueness
        components,
        user: {
          connectOrCreate: {
            where: { id: userId },
            create: {
              id: userId,
              email: 'demo@example.com',
              name: 'Demo User',
            },
          },
        },
      },
    });

    return NextResponse.json(website);
  } catch (error) {
    console.error('Error creating website:', error);
    return NextResponse.json(
      { error: 'Failed to create website' },
      { status: 500 }
    );
  }
}