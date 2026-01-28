import { html, nothing } from "lit";
import { msg } from "@lit/localize";

import { formatAgo } from "../format";
import type { IMessageStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { renderChannelConfigSection } from "./channels.config";

export function renderIMessageCard(params: {
  props: ChannelsProps;
  imessage?: IMessageStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, imessage, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${msg("iMessage")}</div>
      <div class="card-sub">${msg("macOS bridge status and channel configuration.")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${msg("Configured")}</span>
          <span>${imessage?.configured ? msg("Yes") : msg("No")}</span>
        </div>
        <div>
          <span class="label">${msg("Running")}</span>
          <span>${imessage?.running ? msg("Yes") : msg("No")}</span>
        </div>
        <div>
          <span class="label">${msg("Last start")}</span>
          <span>${imessage?.lastStartAt ? formatAgo(imessage.lastStartAt) : msg("n/a")}</span>
        </div>
        <div>
          <span class="label">${msg("Last probe")}</span>
          <span>${imessage?.lastProbeAt ? formatAgo(imessage.lastProbeAt) : msg("n/a")}</span>
        </div>
      </div>

      ${imessage?.lastError
        ? html`<div class="callout danger" style="margin-top: 12px;">
            ${imessage.lastError}
          </div>`
        : nothing}

      ${imessage?.probe
        ? html`<div class="callout" style="margin-top: 12px;">
            ${msg("Probe")} ${imessage.probe.ok ? msg("ok") : msg("failed")} ·
            ${imessage.probe.error ?? ""}
          </div>`
        : nothing}

      ${renderChannelConfigSection({ channelId: "imessage", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${msg("Probe")}
        </button>
      </div>
    </div>
  `;
}
