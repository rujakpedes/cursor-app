import React from 'react';
import { RestaurantHeader } from '../organisms/RestaurantHeader';
import { ActionBar } from '../organisms/ActionBar';
import { PromoStrip } from '../organisms/PromoStrip';
import { MenuGrid } from '../organisms/MenuGrid';
import { BottomBasketBar } from '../organisms/BottomBasketBar';
import './MenuPage.css';

export const MenuPage: React.FC = () => (
  <div className="menu-page">
    <RestaurantHeader />
    <ActionBar />
    <PromoStrip />
    <MenuGrid />
    <div className="menu-page__spacer" />
    <BottomBasketBar />
  </div>
);
