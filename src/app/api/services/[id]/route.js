import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const service = await Service.findById(params.id);
    if (!service) return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const body = await req.json();
    // if (Object.prototype.hasOwnProperty.call(body, 'orderNumber')) {
    //   body.orderNumber ;
    // }
    console.log("order number ", body.orderNumber)
    const service = await Service.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    console.log("service " ,service)
    if (!service) return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const deletedService = await Service.deleteOne({ _id: params.id });
    if (!deletedService) return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
