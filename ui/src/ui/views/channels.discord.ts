import { html, nothing } from "lit";
import { msg } from "@lit/localize";

import { formatAgo } from "../format";
import type { DiscordStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { renderChannelConfigSection } from "./channels.config";

export function renderDiscordCard(params: {
  props: ChannelsProps;
  discord?: DiscordStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, discord, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${msg("Discord")}</div>
      <div class="card-sub">${msg("Bot status and channel configuration.")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${msg("Configured")}</span>
          <span>${discord?.configured ? msg("Yes") : msg("No")}</span>
        </div>
        <div>
          <span class="label">${msg("Running")}</span>
          <span>${discord?.running ? msg("Yes") : msg("No")}</span>
        </div>
        <div>
          <span class="label">${msg("Last start")}</span>
          <span>${discord?.lastStartAt ? formatAgo(discord.lastStartAt) : msg("n/a")}</span>
        </div>
        <div>
          <span class="label">${msg("Last probe")}</span>
          <span>${discord?.lastProbeAt ? formatAgo(discord.lastProbeAt) : msg("n/a")}</span>
        </div>
      </div>

      ${discord?.lastError
        ? html`<div class="callout danger" style="margin-top: 12px;">
            ${discord.lastError}
          </div>`
        : nothing}

      ${discord?.probe
        ? html`<div class="callout" style="margin-top: 12px;">
            ${msg("Probe")} ${discord.probe.ok ? msg("ok") : msg("failed")} ·
            ${discord.probe.status ?? ""} ${discord.probe.error ?? ""}
          </div>`
        : nothing}

      ${renderChannelConfigSection({ channelId: "discord", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${msg("Probe")}
        </button>
      </div>
    </div>
  `;
}
