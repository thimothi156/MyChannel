class OrdersController < ApplicationController
  def index
    @orders = Order.all
  end

  def new
    @order = Order.new
  end

  def create
    @order = Order.create!(order_params)

    render "new"
  end

  private

  def order_params
    params.require(:order).permit(:name)
  end
end