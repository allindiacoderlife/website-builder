import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/websites/[id] - Get a specific website
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const website = await prisma.website.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(website);
  } catch (error) {
    console.error('Error fetching website:', error);
    return NextResponse.json(
      { error: 'Failed to fetch website' },
      { status: 500 }
    );
  }
}

// PUT /api/websites/[id] - Update a website
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, components, published, metadata } = body;

    const website = await prisma.website.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(components && { components }),
        ...(published !== undefined && { published }),
        ...(metadata && { metadata }),
      },
    });

    return NextResponse.json(website);
  } catch (error) {
    console.error('Error updating website:', error);
    return NextResponse.json(
      { error: 'Failed to update website' },
      { status: 500 }
    );
  }
}

// DELETE /api/websites/[id] - Delete a website
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.website.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Website deleted successfully' });
  } catch (error) {
    console.error('Error deleting website:', error);
    return NextResponse.json(
      { error: 'Failed to delete website' },
      { status: 500 }
    );
  }
}