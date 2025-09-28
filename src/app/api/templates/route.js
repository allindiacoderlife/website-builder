import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/templates - Get all templates
export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

// POST /api/templates - Create a new template
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, category, components, preview } = body;

    const template = await prisma.template.create({
      data: {
        name,
        description,
        category: category || 'custom',
        components,
        preview,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}