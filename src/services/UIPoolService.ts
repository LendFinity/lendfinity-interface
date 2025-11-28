import {
  EmodeDataHumanized,
  LegacyUiPoolDataProvider,
  ReservesDataHumanized,
  UiPoolDataProvider,
  UserReserveDataHumanized,
} from '@aave/contract-helpers';
import { Provider } from '@ethersproject/providers';
import { CustomMarket, MarketDataType } from 'src/ui-config/marketsConfig';
import { ENABLE_TESTNET } from 'src/utils/marketsAndNetworksConfig';

export type UserReservesDataHumanized = {
  userReserves: UserReserveDataHumanized[];
  userEmodeCategoryId: number;
};

export class UiPoolService {
  constructor(private readonly getProvider: (chainId: number) => Provider) {}

  private async getUiPoolDataService(marketData: MarketDataType) {
    const provider = this.getProvider(marketData.chainId);
    if (this.useLegacyUiPoolDataProvider(marketData)) {
      return new LegacyUiPoolDataProvider({
        uiPoolDataProviderAddress: marketData.addresses.UI_POOL_DATA_PROVIDER,
        provider,
        chainId: marketData.chainId,
      });
    } else {
      return new UiPoolDataProvider({
        uiPoolDataProviderAddress: marketData.addresses.UI_POOL_DATA_PROVIDER as string,
        provider,
        chainId: marketData.chainId,
      });
    }
  }

  private useLegacyUiPoolDataProvider(marketData: MarketDataType) {
    if (
      marketData.market === CustomMarket.proto_base_sepolia_v3 ||
      marketData.market === CustomMarket.proto_sepolia_horizon_v3
    ) {
      return false;
    }

    // Force legacy provider for Lendfinity market (v3.1 provider has compatibility issues)
    if (marketData.market === CustomMarket.proto_lendfinity_base_v3) {
      return true;
    }

    if (ENABLE_TESTNET || !marketData.v3) {
      // it's a v2 market, or it does not have v3.1 upgrade
      return true;
    }

    return false;
  }

  async getReservesHumanized(marketData: MarketDataType): Promise<ReservesDataHumanized> {
    const uiPoolDataProvider = await this.getUiPoolDataService(marketData);
    const a = await uiPoolDataProvider.getReservesHumanized({
      lendingPoolAddressProvider: marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    });
    console.log(a);
    return a;
  }

  async getUserReservesHumanized(
    marketData: MarketDataType,
    user: string
  ): Promise<UserReservesDataHumanized> {
    const uiPoolDataProvider = await this.getUiPoolDataService(marketData);
    return uiPoolDataProvider.getUserReservesHumanized({
      user,
      lendingPoolAddressProvider: marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    });
  }

  async getEModesHumanized(marketData: MarketDataType): Promise<EmodeDataHumanized[]> {
    // Skip EModes for markets where it's not configured
    if (
      marketData.market === CustomMarket.proto_base_v3 ||
      marketData.market === CustomMarket.proto_lendfinity_base_v3
    ) {
      return [];
    }
    const uiPoolDataProvider = await this.getUiPoolDataService(marketData);
    return uiPoolDataProvider.getEModesHumanized({
      lendingPoolAddressProvider: marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    });
  }
}
