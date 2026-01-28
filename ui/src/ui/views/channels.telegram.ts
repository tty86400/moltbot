import { html, nothing } from "lit";
import { msg } from "@lit/localize";

import { formatAgo } from "../format";
import type { ChannelAccountSnapshot, TelegramStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { renderChannelConfigSection } from "./channels.config";

export function renderTelegramCard(params: {
  props: ChannelsProps;
  telegram?: TelegramStatus;
  telegramAccounts: ChannelAccountSnapshot[];
  accountCountLabel: unknown;
}) {
  const { props, telegram, telegramAccounts, accountCountLabel } = params;
  const hasMultipleAccounts = telegramAccounts.length > 1;

  const renderAccountCard = (account: ChannelAccountSnapshot) => {
    const probe = account.probe as { bot?: { username?: string } } | undefined;
    const botUsername = probe?.bot?.username;
    const label = account.name || account.accountId;
    return html`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">
            ${botUsername ? `@${botUsername}` : label}
          </div>
          <div class="account-card-id">${account.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">${msg("Running")}</span>
            <span>${account.running ? msg("Yes") : msg("No")}</span>
          </div>
          <div>
            <span class="label">${msg("Configured")}</span>
            <span>${account.configured ? msg("Yes") : msg("No")}</span>
          </div>
          <div>
            <span class="label">${msg("Last inbound")}</span>
            <span>${account.lastInboundAt ? formatAgo(account.lastInboundAt) : msg("n/a")}</span>
          </div>
          ${account.lastError
            ? html`
                <div class="account-card-error">
                  ${account.lastError}
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  };

  return html`
    <div class="card">
      <div class="card-title">Telegram</div>
      <div class="card-sub">${msg("Bot status and channel configuration.")}</div>
      ${accountCountLabel}

      ${hasMultipleAccounts
        ? html`
            <div class="account-card-list">
              ${telegramAccounts.map((account) => renderAccountCard(account))}
            </div>
          `
        : html`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">${msg("Configured")}</span>
                <span>${telegram?.configured ? msg("Yes") : msg("No")}</span>
              </div>
              <div>
                <span class="label">${msg("Running")}</span>
                <span>${telegram?.running ? msg("Yes") : msg("No")}</span>
              </div>
              <div>
                <span class="label">${msg("Mode")}</span>
                <span>${telegram?.mode ?? msg("n/a")}</span>
              </div>
              <div>
                <span class="label">${msg("Last start")}</span>
                <span>${telegram?.lastStartAt ? formatAgo(telegram.lastStartAt) : msg("n/a")}</span>
              </div>
              <div>
                <span class="label">${msg("Last probe")}</span>
                <span>${telegram?.lastProbeAt ? formatAgo(telegram.lastProbeAt) : msg("n/a")}</span>
              </div>
            </div>
          `}

      ${telegram?.lastError
        ? html`<div class="callout danger" style="margin-top: 12px;">
            ${telegram.lastError}
          </div>`
        : nothing}

      ${telegram?.probe
        ? html`<div class="callout" style="margin-top: 12px;">
            ${msg("Probe")} ${telegram.probe.ok ? msg("ok") : msg("failed")} ·
            ${telegram.probe.status ?? ""} ${telegram.probe.error ?? ""}
          </div>`
        : nothing}

      ${renderChannelConfigSection({ channelId: "telegram", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${msg("Probe")}
        </button>
      </div>
    </div>
  `;
}
