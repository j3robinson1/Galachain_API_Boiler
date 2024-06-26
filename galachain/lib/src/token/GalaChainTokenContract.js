"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright (c) Gala Games Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const api_1 = require("@gala-chain/api");
const chaincode_1 = require("@gala-chain/chaincode");
const class_transformer_1 = require("class-transformer");
const fabric_contract_api_1 = require("fabric-contract-api");
const package_json_1 = require("../../package.json");
let GalaChainTokenContract = class GalaChainTokenContract extends chaincode_1.GalaContract {
    constructor() {
        super("GalaChainToken", package_json_1.version);
    }
    CreateTokenClass(ctx, dto) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (0, chaincode_1.createTokenClass)(ctx, {
            network: (_a = dto.network) !== null && _a !== void 0 ? _a : api_1.CreateTokenClassDto.DEFAULT_NETWORK,
            tokenClass: dto.tokenClass,
            isNonFungible: !!dto.isNonFungible,
            decimals: (_b = dto.decimals) !== null && _b !== void 0 ? _b : api_1.CreateTokenClassDto.DEFAULT_DECIMALS,
            name: dto.name,
            symbol: dto.symbol,
            description: dto.description,
            rarity: dto.rarity,
            image: dto.image,
            metadataAddress: dto.metadataAddress,
            contractAddress: dto.contractAddress,
            maxSupply: (_c = dto.maxSupply) !== null && _c !== void 0 ? _c : api_1.CreateTokenClassDto.DEFAULT_MAX_SUPPLY,
            maxCapacity: (_d = dto.maxCapacity) !== null && _d !== void 0 ? _d : api_1.CreateTokenClassDto.DEFAULT_MAX_CAPACITY,
            totalMintAllowance: (_e = dto.totalMintAllowance) !== null && _e !== void 0 ? _e : api_1.CreateTokenClassDto.INITIAL_MINT_ALLOWANCE,
            totalSupply: (_f = dto.totalSupply) !== null && _f !== void 0 ? _f : api_1.CreateTokenClassDto.INITIAL_TOTAL_SUPPLY,
            totalBurned: (_g = dto.totalBurned) !== null && _g !== void 0 ? _g : api_1.CreateTokenClassDto.INITIAL_TOTAL_BURNED,
            authorities: (_h = dto.authorities) !== null && _h !== void 0 ? _h : [ctx.callingUser]
        });
    }
    UpdateTokenClass(ctx, dto) {
        return (0, chaincode_1.updateTokenClass)(ctx, dto);
    }
    FetchTokenClasses(ctx, dto) {
        return (0, chaincode_1.fetchTokenClasses)(ctx, dto.tokenClasses);
    }
    FetchTokenClassesWithPagination(ctx, dto) {
        return (0, chaincode_1.fetchTokenClassesWithPagination)(ctx, dto);
    }
    GrantAllowance(ctx, dto) {
        var _a;
        return (0, chaincode_1.grantAllowance)(ctx, {
            tokenInstance: dto.tokenInstance,
            allowanceType: dto.allowanceType,
            quantities: dto.quantities,
            uses: dto.uses,
            expires: (_a = dto.expires) !== null && _a !== void 0 ? _a : api_1.GrantAllowanceDto.DEFAULT_EXPIRES
        });
    }
    RefreshAllowances(ctx, dto) {
        return (0, chaincode_1.refreshAllowances)(ctx, dto.allowances);
    }
    FullAllowanceCheck(ctx, dto) {
        var _a, _b, _c;
        return (0, chaincode_1.fullAllowanceCheck)(ctx, {
            owner: (_a = dto.owner) !== null && _a !== void 0 ? _a : ctx.callingUser,
            grantedTo: (_b = dto.grantedTo) !== null && _b !== void 0 ? _b : ctx.callingUser,
            allowanceType: (_c = dto.allowanceType) !== null && _c !== void 0 ? _c : api_1.AllowanceType.Use,
            collection: dto.collection,
            category: dto.category,
            type: dto.type,
            additionalKey: dto.additionalKey
        });
    }
    FetchAllowances(ctx, dto) {
        var _a;
        return (0, chaincode_1.fetchAllowancesWithPagination)(ctx, {
            ...dto,
            limit: (_a = dto.limit) !== null && _a !== void 0 ? _a : api_1.FetchAllowancesDto.DEFAULT_LIMIT
        });
    }
    DeleteAllowances(ctx, dto) {
        return (0, chaincode_1.deleteAllowances)(ctx, dto);
    }
    FetchBalances(ctx, dto) {
        var _a;
        return (0, chaincode_1.fetchBalances)(ctx, { ...dto, owner: (_a = dto.owner) !== null && _a !== void 0 ? _a : ctx.callingUser });
    }
    async RequestMint(ctx, dto) {
        return (0, chaincode_1.requestMint)(ctx, dto, undefined);
    }
    async FulfillMint(ctx, dto) {
        return (0, chaincode_1.fulfillMintRequest)(ctx, dto);
    }
    /**
     * Mint a new instance of an existing TokenClass. High-throughput implementation.
     *
     * @experimental 2023-03-23
     *
     * @decorator `@GalaTransaction(GalaTransactionOptions<HighThroughputMintTokenDto>)`
     */
    async HighThroughputMint(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ctx, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dto) {
        return Promise.reject(new Error(`HighThroughputMint is a sequence call: Execute RequestMint and FulfillMint sequentially.`));
    }
    async FetchMintRequests(ctx, dto) {
        const mintRequestsClassKey = (0, class_transformer_1.plainToClass)(api_1.TokenClassKey, {
            collection: dto.collection,
            category: dto.category,
            type: dto.type,
            additionalKey: dto.additionalKey
        });
        return (0, chaincode_1.mintRequestsByTimeRange)(ctx, mintRequestsClassKey, dto.startTimestamp, dto.endTimestamp);
    }
    /**
     * Mint a new instance of an existing TokenClass.
     *
     * @deprecated 2022-12-12, replaced with high-throughput implementation.
     *
     * @decorator `@GalaTransaction(GalaTransactionOptions<MintTokenDto>)`
     */
    async MintToken(ctx, dto) {
        var _a;
        return (0, chaincode_1.mintToken)(ctx, {
            tokenClassKey: dto.tokenClass,
            owner: (_a = dto.owner) !== null && _a !== void 0 ? _a : ctx.callingUser,
            quantity: dto.quantity,
            authorizedOnBehalf: undefined,
            applicableAllowanceKey: dto.allowanceKey
        });
    }
    async MintTokenWithAllowance(ctx, dto) {
        var _a;
        return (0, chaincode_1.mintTokenWithAllowance)(ctx, {
            tokenClassKey: dto.tokenClass,
            tokenInstance: dto.tokenInstance,
            owner: (_a = dto.owner) !== null && _a !== void 0 ? _a : ctx.callingUser,
            quantity: dto.quantity
        });
    }
    async BatchMintToken(ctx, dto) {
        const params = dto.mintDtos.map(async (d) => {
            var _a;
            return ({
                tokenClassKey: d.tokenClass,
                owner: (_a = d.owner) !== null && _a !== void 0 ? _a : ctx.callingUser,
                quantity: d.quantity,
                authorizedOnBehalf: undefined
            });
        });
        return (0, chaincode_1.batchMintToken)(ctx, await Promise.all(params));
    }
    async UseToken(ctx, dto) {
        var _a, _b;
        return (0, chaincode_1.useToken)(ctx, {
            owner: (_a = dto.owner) !== null && _a !== void 0 ? _a : ctx.callingUser,
            inUseBy: dto.inUseBy,
            tokenInstanceKey: dto.tokenInstance,
            quantity: dto.quantity,
            allowancesToUse: (_b = dto.useAllowances) !== null && _b !== void 0 ? _b : [],
            authorizedOnBehalf: undefined
        });
    }
    ReleaseToken(ctx, dto) {
        return (0, chaincode_1.releaseToken)(ctx, {
            tokenInstanceKey: dto.tokenInstance
        });
    }
    LockToken(ctx, dto) {
        var _a, _b;
        return (0, chaincode_1.lockToken)(ctx, {
            owner: (_a = dto.owner) !== null && _a !== void 0 ? _a : ctx.callingUser,
            lockAuthority: dto.lockAuthority,
            tokenInstanceKey: dto.tokenInstance,
            quantity: dto.quantity,
            allowancesToUse: (_b = dto.useAllowances) !== null && _b !== void 0 ? _b : [],
            name: undefined,
            expires: 0,
            verifyAuthorizedOnBehalf: async () => undefined
        });
    }
    LockTokens(ctx, dto) {
        var _a, _b;
        // const verifyAuthorizedOnBehalf = (c: TokenClassKey) => bridgeTypeUser(ctx, dto.lockAuthority, c);
        return (0, chaincode_1.lockTokens)(ctx, {
            lockAuthority: dto.lockAuthority,
            tokenInstances: dto.tokenInstances,
            allowancesToUse: (_a = dto.useAllowances) !== null && _a !== void 0 ? _a : [],
            name: dto.name,
            expires: (_b = dto.expires) !== null && _b !== void 0 ? _b : 0,
            verifyAuthorizedOnBehalf: async () => undefined
        });
    }
    async UnlockToken(ctx, dto) {
        return (0, chaincode_1.unlockToken)(ctx, {
            tokenInstanceKey: dto.tokenInstance,
            name: undefined,
            quantity: dto.quantity
        });
    }
    async UnlockTokens(ctx, dto) {
        const params = dto.tokenInstances.map(async (d) => {
            var _a;
            return ({
                tokenInstanceKey: d.tokenInstanceKey,
                quantity: d.quantity,
                owner: (_a = d.owner) !== null && _a !== void 0 ? _a : ctx.callingUser,
                name: dto.name,
                forSwap: false
            });
        });
        return (0, chaincode_1.unlockTokens)(ctx, await Promise.all(params));
    }
    async TransferToken(ctx, dto) {
        var _a, _b;
        return (0, chaincode_1.transferToken)(ctx, {
            from: (_a = dto.from) !== null && _a !== void 0 ? _a : ctx.callingUser,
            to: dto.to,
            tokenInstanceKey: dto.tokenInstance,
            quantity: dto.quantity,
            allowancesToUse: (_b = dto.useAllowances) !== null && _b !== void 0 ? _b : [],
            authorizedOnBehalf: undefined
        });
    }
    BurnTokens(ctx, dto) {
        var _a;
        return (0, chaincode_1.burnTokens)(ctx, {
            owner: (_a = dto.owner) !== null && _a !== void 0 ? _a : ctx.callingUser,
            toBurn: dto.tokenInstances
        });
    }
    FetchBurns(ctx, dto) {
        return (0, chaincode_1.fetchBurns)(ctx, dto);
    }
};
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.CreateTokenClassDto,
        out: api_1.TokenClassKey,
        allowedOrgs: ["CuratorOrg"],
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.CreateTokenClassDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "CreateTokenClass", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.UpdateTokenClassDto,
        out: api_1.TokenClassKey,
        allowedOrgs: ["CuratorOrg"],
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.UpdateTokenClassDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "UpdateTokenClass", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.EVALUATE,
        in: api_1.FetchTokenClassesDto,
        out: { arrayOf: api_1.TokenClass }
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.FetchTokenClassesDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "FetchTokenClasses", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.EVALUATE,
        in: api_1.FetchTokenClassesWithPaginationDto,
        out: api_1.FetchTokenClassesResponse
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext,
        api_1.FetchTokenClassesWithPaginationDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "FetchTokenClassesWithPagination", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.GrantAllowanceDto,
        out: { arrayOf: api_1.TokenAllowance },
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.GrantAllowanceDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "GrantAllowance", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.RefreshAllowancesDto,
        out: { arrayOf: api_1.TokenAllowance },
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.RefreshAllowancesDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "RefreshAllowances", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.EVALUATE,
        in: api_1.FullAllowanceCheckDto,
        out: api_1.FullAllowanceCheckResDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext,
        api_1.FullAllowanceCheckDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "FullAllowanceCheck", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.EVALUATE,
        in: api_1.FetchAllowancesDto,
        out: api_1.FetchAllowancesResponse
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.FetchAllowancesDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "FetchAllowances", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.DeleteAllowancesDto,
        out: "number",
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.DeleteAllowancesDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "DeleteAllowances", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.EVALUATE,
        in: api_1.FetchBalancesDto,
        out: { arrayOf: api_1.TokenBalance }
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.FetchBalancesDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "FetchBalances", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.HighThroughputMintTokenDto,
        out: api_1.FulfillMintDto,
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.HighThroughputMintTokenDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "RequestMint", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.FulfillMintDto,
        out: { arrayOf: api_1.TokenInstanceKey },
        allowedOrgs: ["CuratorOrg"]
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.FulfillMintDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "FulfillMint", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.HighThroughputMintTokenDto,
        out: { arrayOf: api_1.TokenInstanceKey },
        verifySignature: true,
        sequence: [
            {
                methodName: "RequestMint",
                isWrite: true,
                dtoSchema: (0, api_1.generateSchema)(api_1.HighThroughputMintTokenDto),
                responseSchema: (0, api_1.generateResponseSchema)(api_1.FulfillMintDto)
            },
            {
                methodName: "FulfillMint",
                isWrite: true,
                dtoSchema: (0, api_1.generateSchema)(api_1.FulfillMintDto),
                responseSchema: (0, api_1.generateResponseSchema)(api_1.TokenInstanceKey, "array")
            }
        ]
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext,
        api_1.HighThroughputMintTokenDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "HighThroughputMint", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.EVALUATE,
        in: api_1.FetchMintRequestsDto,
        out: { arrayOf: api_1.MintRequestDto }
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext,
        api_1.FetchMintRequestsDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "FetchMintRequests", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.MintTokenDto,
        out: { arrayOf: api_1.TokenInstanceKey },
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.MintTokenDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "MintToken", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.MintTokenWithAllowanceDto,
        out: { arrayOf: api_1.TokenInstanceKey },
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext,
        api_1.MintTokenWithAllowanceDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "MintTokenWithAllowance", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.BatchMintTokenDto,
        out: { arrayOf: api_1.TokenInstanceKey },
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.BatchMintTokenDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "BatchMintToken", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.UseTokenDto,
        out: api_1.TokenBalance,
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.UseTokenDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "UseToken", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.ReleaseTokenDto,
        out: api_1.TokenBalance,
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.ReleaseTokenDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "ReleaseToken", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.LockTokenDto,
        out: api_1.TokenBalance,
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.LockTokenDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "LockToken", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.LockTokensDto,
        out: { arrayOf: api_1.TokenBalance },
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.LockTokensDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "LockTokens", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.UnlockTokenDto,
        out: api_1.TokenBalance,
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.UnlockTokenDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "UnlockToken", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.UnlockTokensDto,
        out: { arrayOf: api_1.TokenBalance },
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.UnlockTokensDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "UnlockTokens", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.TransferTokenDto,
        out: { arrayOf: api_1.TokenBalance },
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.TransferTokenDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "TransferToken", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.SUBMIT,
        in: api_1.BurnTokensDto,
        out: { arrayOf: api_1.TokenBurn },
        verifySignature: true
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.BurnTokensDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "BurnTokens", null);
tslib_1.__decorate([
    (0, chaincode_1.GalaTransaction)({
        type: chaincode_1.EVALUATE,
        in: api_1.FetchBurnsDto,
        out: { arrayOf: api_1.TokenBurn }
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, api_1.FetchBurnsDto]),
    tslib_1.__metadata("design:returntype", Promise)
], GalaChainTokenContract.prototype, "FetchBurns", null);
GalaChainTokenContract = tslib_1.__decorate([
    (0, fabric_contract_api_1.Info)({ title: "GalaChainToken", description: "Contract for managing GalaChain tokens" }),
    tslib_1.__metadata("design:paramtypes", [])
], GalaChainTokenContract);
exports.default = GalaChainTokenContract;
