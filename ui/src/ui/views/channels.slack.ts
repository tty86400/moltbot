import { html, nothing } from "lit";
import { msg } from "@lit/localize";

import { formatAgo } from "../format";
import type { SlackStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { renderChannelConfigSection } from "./channels.config";

export function renderSlackCard(params: {
  props: ChannelsProps;
  slack?: SlackStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, slack, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${msg("Slack")}</div>
      <div class="card-sub">${msg("Socket mode status and channel configuration.")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${msg("Configured")}</span>
          <span>${slack?.configured ? msg("Yes") : msg("No")}</span>
        </div>
        <div>
          <span class="label">${msg("Running")}</span>
          <span>${slack?.running ? msg("Yes") : msg("No")}</span>
        </div>
        <div>
          <span class="label">${msg("Last start")}</span>
          <span>${slack?.lastStartAt ? formatAgo(slack.lastStartAt) : msg("n/a")}</span>
        </div>
        <div>
          <span class="label">${msg("Last probe")}</span>
          <span>${slack?.lastProbeAt ? formatAgo(slack.lastProbeAt) : msg("n/a")}</span>
        </div>
      </div>

      ${slack?.lastError
        ? html`<div class="callout danger" style="margin-top: 12px;">
            ${slack.lastError}
          </div>`
        : nothing}

      ${slack?.probe
        ? html`<div class="callout" style="margin-top: 12px;">
            ${msg("Probe")} ${slack.probe.ok ? msg("ok") : msg("failed")} ·
            ${slack.probe.status ?? ""} ${slack.probe.error ?? ""}
          </div>`
        : nothing}

      ${renderChannelConfigSection({ channelId: "slack", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${msg("Probe")}
        </button>
      </div>
    </div>
  `;
}
